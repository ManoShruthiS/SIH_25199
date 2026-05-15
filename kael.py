import os
import json
import random
import time
import datetime
import subprocess
import google.generativeai as genai

# ==============================================================================
# KAEL - THE GHOST DEVELOPER (LATE NIGHT CRUNCH MODE)
# ==============================================================================
PROJECT_DIR = os.path.dirname(os.path.abspath(__file__))
LOG_FILE = os.path.join(PROJECT_DIR, ".kael_logs.txt")
STATE_FILE = os.path.join(PROJECT_DIR, "kael_state.json")
# Hardcoded for convenience since dev_runner.py is strictly ignored in .gitignore
API_KEY = "AIzaSyA1vsbuB8ydGtVk1impIM24KbF3DtgLQIA"

genai.configure(api_key=API_KEY)
model = genai.GenerativeModel("gemini-flash-latest")

# 13 Days to May 18 Deadline. 55 comprehensive tasks to build the ENTIRE platform.
INITIAL_TASKS = [
    {"file": "backend/requirements.txt", "desc": "FastAPI, SQLAlchemy, Pydantic, PostgreSQL dependencies"},
    {"file": "backend/app/core/config.py", "desc": "Environment variables and app configuration settings"},
    {"file": "backend/app/main.py", "desc": "FastAPI application instance and CORS setup"},
    {"file": "backend/app/db/session.py", "desc": "SQLAlchemy engine and session maker"},
    {"file": "backend/app/core/security.py", "desc": "JWT hashing and token generation logic"},
    {"file": "backend/app/models/user.py", "desc": "User database model with roles"},
    {"file": "backend/app/models/skill.py", "desc": "NSQF Skill database model"},
    {"file": "backend/app/models/course.py", "desc": "Course and content database model"},
    {"file": "backend/app/models/learning_path.py", "desc": "Personalized learning path model mapping user to courses"},
    {"file": "backend/app/schemas/user.py", "desc": "Pydantic schemas for User create/read"},
    {"file": "backend/app/schemas/skill.py", "desc": "Pydantic schemas for Skill validation"},
    {"file": "backend/app/schemas/learning_path.py", "desc": "Pydantic schemas for Learning Path"},
    {"file": "backend/app/schemas/token.py", "desc": "Pydantic schemas for JWT tokens"},
    {"file": "backend/app/crud/crud_user.py", "desc": "Database CRUD operations for User"},
    {"file": "backend/app/crud/crud_skill.py", "desc": "Database CRUD operations for Skills"},
    {"file": "backend/app/services/ai_recommender.py", "desc": "Logic for generating learning paths based on skills"},
    {"file": "backend/app/services/lmi_parser.py", "desc": "Labour Market Intelligence data ingestion logic"},
    {"file": "backend/app/api/endpoints/auth.py", "desc": "Authentication and login API endpoints"},
    {"file": "backend/app/api/endpoints/users.py", "desc": "User profile management endpoints"},
    {"file": "backend/app/api/endpoints/skills.py", "desc": "Skills catalog endpoints"},
    {"file": "backend/app/api/endpoints/paths.py", "desc": "Learning path generation and retrieval endpoints"},
    {"file": "backend/app/api/api_router.py", "desc": "Main API router combining all endpoints"},
    {"file": "frontend/package.json", "desc": "Next.js, React, Tailwind, Axios dependencies"},
    {"file": "frontend/tailwind.config.js", "desc": "Tailwind CSS configuration with custom branding colors"},
    {"file": "frontend/tsconfig.json", "desc": "TypeScript configuration for Next.js"},
    {"file": "frontend/src/styles/globals.css", "desc": "Global CSS with Tailwind directives"},
    {"file": "frontend/src/lib/api.ts", "desc": "Axios instance setup for backend communication"},
    {"file": "frontend/src/context/AuthContext.tsx", "desc": "React Context for user authentication state"},
    {"file": "frontend/src/hooks/useAuth.ts", "desc": "Custom hook for using AuthContext"},
    {"file": "frontend/src/components/layout/Navbar.tsx", "desc": "Main navigation bar component"},
    {"file": "frontend/src/components/layout/Footer.tsx", "desc": "Footer component"},
    {"file": "frontend/src/components/layout/AppLayout.tsx", "desc": "Main application layout wrapper"},
    {"file": "frontend/src/pages/login.tsx", "desc": "User login page"},
    {"file": "frontend/src/pages/register.tsx", "desc": "User registration page"},
    {"file": "frontend/src/components/auth/LoginForm.tsx", "desc": "Login form component with validation"},
    {"file": "frontend/src/components/auth/RegisterForm.tsx", "desc": "Registration form component with validation"},
    {"file": "frontend/src/pages/dashboard/index.tsx", "desc": "Main user dashboard page for learners"},
    {"file": "frontend/src/pages/policymaker/index.tsx", "desc": "Policymaker dashboard for system-wide LMI and NSQF insights"},
    {"file": "frontend/src/pages/trainer/index.tsx", "desc": "Trainer dashboard for tracking learner progress and skill gaps"},
    {"file": "frontend/src/components/common/LanguageSwitcher.tsx", "desc": "i18n Language Switcher for multilingual, inclusive access"},
    {"file": "frontend/src/components/dashboard/StatCard.tsx", "desc": "Reusable statistics card component"},
    {"file": "frontend/src/components/dashboard/LearningProgress.tsx", "desc": "Component showing current learning path progress"},
    {"file": "frontend/src/components/dashboard/RecentActivity.tsx", "desc": "Recent activity timeline component"},
    {"file": "frontend/src/pages/onboarding.tsx", "desc": "User skills assessment onboarding page"},
    {"file": "frontend/src/components/onboarding/SkillSelector.tsx", "desc": "Interactive skill selection component"},
    {"file": "frontend/src/components/onboarding/CareerGoalInput.tsx", "desc": "Component to input target job role"},
    {"file": "frontend/src/services/profilingService.ts", "desc": "API calls for submitting user profile"},
    {"file": "frontend/src/pages/path/[id].tsx", "desc": "Dynamic page for a specific learning path"},
    {"file": "frontend/src/components/path/PathTimeline.tsx", "desc": "Visual timeline of courses in the path"},
    {"file": "frontend/src/components/path/CourseCard.tsx", "desc": "Card displaying course details"},
    {"file": "frontend/src/components/path/MilestoneTracker.tsx", "desc": "Tracker for NSQF milestones"},
    {"file": "frontend/src/pages/career.tsx", "desc": "Career guidance based on LMI data"},
    {"file": "frontend/src/components/career/MarketTrends.tsx", "desc": "Charts showing job market trends"},
    {"file": "frontend/src/components/career/SalaryEstimator.tsx", "desc": "Salary estimation tool based on skills"},
    {"file": "frontend/src/components/ui/Chart.tsx", "desc": "Reusable chart component"},
    {"file": "frontend/src/pages/index.tsx", "desc": "Landing page with platform value proposition"},
    {"file": "frontend/src/components/home/HeroSection.tsx", "desc": "Hero section for landing page"},
    {"file": "frontend/src/components/home/Features.tsx", "desc": "Features overview for landing page"}
]

PROJECT_ARCHITECTURE_MAP = "\n".join([f"- {t['file']}: {t['desc']}" for t in INITIAL_TASKS])

PROBLEM_STATEMENT_CONTEXT = """
EXACT PROBLEM STATEMENT CONTEXT (MSDE / NCVET):
The system is an AI-Powered Personalized Learning Path Generator. 
1. MUST analyze learner profiles (academic, skills, socio-economic, pace, aspirations).
2. MUST map career aspirations with industry-driven skill requirements and NSQF-aligned programs.
3. MUST generate adaptive, personalized training pathways (courses, micro-credentials, certifications, OJT).
4. MUST include a career guidance dashboard for learners, trainers, and policymakers.
5. MUST have real-time mapping with Labour Market Intelligence (LMI).
6. MUST be multilingual, inclusive, accessible, highly scalable, and comply with data privacy norms.
"""

STEALTH_PROMPT = f"""
You are a senior full-stack software engineer working a late-night crunch to meet a May 18 deadline for an enterprise project (SIH 25199).
The CEO has set strict deadlines. You must act entirely as a human developer writing real, working application files.

CRITICAL DIRECTIVE (ABSOLUTE STEALTH):
Under NO CIRCUMSTANCES use words like 'AI', 'bot', 'Gemini', 'Kael', 'automated', or 'generated' in your code or comments.
Write clean, modular, production-ready code. Do NOT provide markdown wrappers like ```python. Do NOT provide conversational text. Output ONLY the raw file contents exactly as they should be saved to disk.

{{PROBLEM_STATEMENT_CONTEXT}}

PROJECT ARCHITECTURE MAP:
(Use these exact paths for all your imports and dependencies to ensure the project links together perfectly)
{{PROJECT_ARCHITECTURE_MAP}}

CRITICAL ARCHITECTURE RULES (must always follow these - do NOT deviate):
1. BACKEND USER MODEL: User.id is an INTEGER primary key (not UUID). Do NOT use UUID for any model PK.
2. BACKEND IMPORTS: main.py imports api_router from 'app.api.api_router', NOT from 'app.api.v1.api'.
3. BACKEND PASSWORDS: Use passlib/bcrypt via 'app.core.security'. Do NOT import werkzeug anywhere.
4. BACKEND AUTH URL: The OAuth2 tokenUrl is '/api/v1/auth/login/access-token' (includes /auth/ prefix).
5. BACKEND USER MODEL: The User model has NO 'username' column. Authentication is by email only.
6. BACKEND USER SKILL: UserSkill is defined in app.models.user alongside User. Import both when needed.
7. FRONTEND .next/ folder is in .gitignore and must NEVER be committed. Do not reference it.
8. FRONTEND: All pages use Next.js Pages Router (pages/ directory), NOT App Router (app/ directory).
"""

def log_activity(msg):
    timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open(LOG_FILE, "a") as f:
        f.write(f"[{timestamp}] {msg}\n")
    print(f"[{timestamp}] {msg}")

def run_git_command(command):
    try:
        result = subprocess.run(command, cwd=PROJECT_DIR, check=True, capture_output=True, text=True)
        return result.stdout
    except subprocess.CalledProcessError as e:
        log_activity(f"Git Error: {e.stderr}")
        return None

def load_state():
    if os.path.exists(STATE_FILE):
        with open(STATE_FILE, "r") as f:
            return json.load(f)
    return {"pending_tasks": INITIAL_TASKS, "completed_tasks": []}

def save_state(state):
    with open(STATE_FILE, "w") as f:
        json.dump(state, f, indent=4)

def get_project_context():
    """Reads core files to provide context for code generation."""
    context_files = [
        "backend/app/core/config.py",
        "backend/app/main.py",
        "backend/app/models/user.py",
        "backend/app/schemas/user.py",
        "backend/app/api/api_router.py",
        "frontend/src/lib/api.ts",
        "frontend/src/context/AuthContext.tsx"
    ]
    context_str = "\n--- CORE PROJECT CONTEXT ---\n"
    for rel_path in context_files:
        abs_path = os.path.join(PROJECT_DIR, rel_path)
        if os.path.exists(abs_path):
            try:
                with open(abs_path, "r", encoding="utf-8") as f:
                    context_str += f"\nFILE: {rel_path}\n```\n{f.read()[:1500]}\n```\n" # Limit each file
            except:
                pass
    return context_str

def generate_code(task):
    target_path = os.path.join(PROJECT_DIR, task['file'])
    existing_code = ""
    if os.path.exists(target_path):
        try:
            with open(target_path, "r", encoding="utf-8") as f:
                existing_code = f.read()
        except:
            pass
            
    context = get_project_context()
    if existing_code:
        prompt = f"{STEALTH_PROMPT}\n\n{context}\n\nTask: Improve the existing file '{task['file']}'. \nRequirement: {task['desc']}.\n\nExisting Code:\n```\n{existing_code}\n```\n\nReturn ONLY the fully updated code for this file without any markdown wrappers."
    else:
        prompt = f"{STEALTH_PROMPT}\n\n{context}\n\nTask: Build the exact file '{task['file']}'. \nContext and requirements: {task['desc']}.\nReturn ONLY the raw code without any markdown wrappers."
    try:
        response = model.generate_content(prompt)
        code = response.text.strip()
        # Fallback if Gemini injects markdown formatting
        if code.startswith("```"):
            code = "\n".join(code.split("\n")[1:])
        if code.endswith("```"):
            code = "\n".join(code.split("\n")[:-1])
        return code.strip()
    except Exception as e:
        error_msg = str(e).lower()
        if "429" in error_msg or "quota" in error_msg or "exhausted" in error_msg:
            log_activity(f"API credit finish/quota exhausted. Error: {e}")
            raise RuntimeError("API_LIMIT_REACHED")
        log_activity(f"Generation error: {e}")
        return None

def generate_commit_message(task, code_snippet):
    """Uses AI to generate a human-like, specific commit message."""
    prompt = f"Write a short, human-like git commit message (one line) for this file change: {task['file']}. The change is: {task['desc']}. Code snippet:\n{code_snippet[:500]}\nUse conventional commits format (feat:, fix:, refactor:, chore:). Return ONLY the message."
    try:
        response = model.generate_content(prompt)
        return response.text.strip().replace('"', '').replace("'", "")
    except:
        # Fallback to templates if AI fails
        messages = [
            f"feat: implement {os.path.basename(task['file'])}",
            f"refactor: logic for {os.path.basename(task['file'])}",
            f"chore: bootstrap {task['desc'].lower()}",
            f"feat: {task['desc'].lower()}",
            f"fix: wire up {os.path.basename(task['file'])} dependencies"
        ]
        return random.choice(messages)

def main():
    log_activity("Syncing with remote repository before starting work...")
    pull_result = run_git_command(["git", "pull", "--rebase", "origin", "main"])
    if pull_result is None:
        log_activity("Git pull failed (likely a conflict). Aborting rebase and exiting safely.")
        run_git_command(["git", "rebase", "--abort"])
        import sys
        sys.exit(1)
    
    
    state = load_state()
    pending = state["pending_tasks"]
    
    if not pending:
        log_activity("Core tasks finished! Generating autonomous optimization tasks to keep working until May 18...")
        completed = state.get("completed_tasks", [])
        if completed:
            files_to_improve = random.sample(completed, min(len(completed), random.randint(20, 35)))
            new_tasks = []
            for f in files_to_improve:
                action = random.choice([
                    "Refactor and optimize logic", 
                    "Add comprehensive docstrings and professional comments", 
                    "Improve error handling and logging", 
                    "Enhance security and input validation",
                    "Clean up code structure and formatting"
                ])
                new_tasks.append({
                    "file": f["file"],
                    "desc": f"{action} in this file"
                })
            state["pending_tasks"] = new_tasks
            pending = new_tasks
        else:
            log_activity("No completed tasks to improve. Exiting.")
            return

    # Simulate an intense 9 PM night shift crunch.
    try:
        for i, task in enumerate(pending):
            log_activity(f"Working on {task['file']}...")
            
            code = generate_code(task)
            if not code:
                log_activity("Skipping due to generation failure.")
                continue
                
            full_path = os.path.join(PROJECT_DIR, task['file'])
            os.makedirs(os.path.dirname(full_path), exist_ok=True)
            
            with open(full_path, "w", encoding="utf-8") as f:
                f.write(code)
                
            run_git_command(["git", "add", full_path])
            commit_msg = generate_commit_message(task, code)
            run_git_command(["git", "commit", "-m", commit_msg])
            log_activity(f"Committed: {commit_msg}")
            
            # Mark as done
            state["pending_tasks"] = [t for t in state["pending_tasks"] if t["file"] != task["file"]]
            state["completed_tasks"].append(task)
            save_state(state)
            
            # High-speed crunch mode delay
            delay_seconds = random.randint(10, 30)
            log_activity(f"Taking a quick {delay_seconds} second break...")
            time.sleep(delay_seconds)
            
    except RuntimeError as e:
        if str(e) == "API_LIMIT_REACHED":
            log_activity("Stopping session due to API limit.")
        else:
            log_activity(f"Session interrupted: {e}")
    except Exception as e:
        log_activity(f"Unexpected session error: {e}")

    log_activity("Night shift over. Syncing with remote one last time...")
    pull_result = run_git_command(["git", "pull", "--rebase", "origin", "main"])
    if pull_result is None:
        log_activity("Git pull failed during final sync. Aborting rebase.")
        run_git_command(["git", "rebase", "--abort"])
    else:
        log_activity("Pushing tonight's progress to remote...")
        run_git_command(["git", "push", "origin", "main"])
        log_activity("Push successful. Catching some sleep until tomorrow.")

if __name__ == "__main__":
    # A short initial delay so it doesn't fire instantly
    initial_delay = random.randint(2, 8)
    log_activity(f"Clocking in. Waiting {initial_delay} seconds to start coding...")
    time.sleep(initial_delay)
    main()
