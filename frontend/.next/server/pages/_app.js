/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "./src/context/AuthContext.tsx":
/*!*************************************!*\
  !*** ./src/context/AuthContext.tsx ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   AuthContext: () => (/* binding */ AuthContext),\n/* harmony export */   AuthProvider: () => (/* binding */ AuthProvider),\n/* harmony export */   useAuth: () => (/* binding */ useAuth)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n\n\nconst AuthContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)(undefined);\nconst AuthProvider = ({ children })=>{\n    const [user, setUser] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    const [token, setToken] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    const [isLoading, setIsLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);\n    const logout = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(()=>{\n        localStorage.removeItem(\"authToken\");\n        localStorage.removeItem(\"authUser\");\n        setUser(null);\n        setToken(null);\n        setIsLoading(false);\n    }, []);\n    const login = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((userData, authToken)=>{\n        localStorage.setItem(\"authToken\", authToken);\n        localStorage.setItem(\"authUser\", JSON.stringify(userData));\n        setUser(userData);\n        setToken(authToken);\n        setIsLoading(false);\n    }, []);\n    const updateUser = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((userData)=>{\n        setUser((prev)=>{\n            if (!prev) return null;\n            const updated = {\n                ...prev,\n                ...userData\n            };\n            localStorage.setItem(\"authUser\", JSON.stringify(updated));\n            return updated;\n        });\n    }, []);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        const initializeAuth = ()=>{\n            try {\n                const storedToken = localStorage.getItem(\"authToken\");\n                const storedUser = localStorage.getItem(\"authUser\");\n                if (storedToken && storedUser) {\n                    setToken(storedToken);\n                    setUser(JSON.parse(storedUser));\n                }\n            } catch (error) {\n                console.error(\"Session restoration failed:\", error);\n                localStorage.removeItem(\"authToken\");\n                localStorage.removeItem(\"authUser\");\n            } finally{\n                setIsLoading(false);\n            }\n        };\n        initializeAuth();\n    }, []);\n    const value = {\n        user,\n        token,\n        isAuthenticated: !!token,\n        isLoading,\n        login,\n        logout,\n        updateUser\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(AuthContext.Provider, {\n        value: value,\n        children: children\n    }, void 0, false, {\n        fileName: \"C:\\\\Users\\\\manos\\\\OneDrive\\\\Desktop\\\\My Projects\\\\SIH_25199\\\\frontend\\\\src\\\\context\\\\AuthContext.tsx\",\n        lineNumber: 85,\n        columnNumber: 10\n    }, undefined);\n};\nconst useAuth = ()=>{\n    const context = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(AuthContext);\n    if (context === undefined) {\n        throw new Error(\"useAuth must be used within an AuthProvider\");\n    }\n    return context;\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29udGV4dC9BdXRoQ29udGV4dC50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBc0c7QUFvQi9GLE1BQU1NLDRCQUFjTCxvREFBYUEsQ0FBOEJNLFdBQVc7QUFFMUUsTUFBTUMsZUFBa0QsQ0FBQyxFQUFFQyxRQUFRLEVBQUU7SUFDMUUsTUFBTSxDQUFDQyxNQUFNQyxRQUFRLEdBQUdSLCtDQUFRQSxDQUFjO0lBQzlDLE1BQU0sQ0FBQ1MsT0FBT0MsU0FBUyxHQUFHViwrQ0FBUUEsQ0FBZ0I7SUFDbEQsTUFBTSxDQUFDVyxXQUFXQyxhQUFhLEdBQUdaLCtDQUFRQSxDQUFVO0lBRXBELE1BQU1hLFNBQVNYLGtEQUFXQSxDQUFDO1FBQ3pCWSxhQUFhQyxVQUFVLENBQUM7UUFDeEJELGFBQWFDLFVBQVUsQ0FBQztRQUN4QlAsUUFBUTtRQUNSRSxTQUFTO1FBQ1RFLGFBQWE7SUFDZixHQUFHLEVBQUU7SUFFTCxNQUFNSSxRQUFRZCxrREFBV0EsQ0FBQyxDQUFDZSxVQUFnQkM7UUFDekNKLGFBQWFLLE9BQU8sQ0FBQyxhQUFhRDtRQUNsQ0osYUFBYUssT0FBTyxDQUFDLFlBQVlDLEtBQUtDLFNBQVMsQ0FBQ0o7UUFDaERULFFBQVFTO1FBQ1JQLFNBQVNRO1FBQ1ROLGFBQWE7SUFDZixHQUFHLEVBQUU7SUFFTCxNQUFNVSxhQUFhcEIsa0RBQVdBLENBQUMsQ0FBQ2U7UUFDOUJULFFBQVEsQ0FBQ2U7WUFDUCxJQUFJLENBQUNBLE1BQU0sT0FBTztZQUNsQixNQUFNQyxVQUFVO2dCQUFFLEdBQUdELElBQUk7Z0JBQUUsR0FBR04sUUFBUTtZQUFDO1lBQ3ZDSCxhQUFhSyxPQUFPLENBQUMsWUFBWUMsS0FBS0MsU0FBUyxDQUFDRztZQUNoRCxPQUFPQTtRQUNUO0lBQ0YsR0FBRyxFQUFFO0lBRUx2QixnREFBU0EsQ0FBQztRQUNSLE1BQU13QixpQkFBaUI7WUFDckIsSUFBSTtnQkFDRixNQUFNQyxjQUFjWixhQUFhYSxPQUFPLENBQUM7Z0JBQ3pDLE1BQU1DLGFBQWFkLGFBQWFhLE9BQU8sQ0FBQztnQkFFeEMsSUFBSUQsZUFBZUUsWUFBWTtvQkFDN0JsQixTQUFTZ0I7b0JBQ1RsQixRQUFRWSxLQUFLUyxLQUFLLENBQUNEO2dCQUNyQjtZQUNGLEVBQUUsT0FBT0UsT0FBTztnQkFDZEMsUUFBUUQsS0FBSyxDQUFDLCtCQUErQkE7Z0JBQzdDaEIsYUFBYUMsVUFBVSxDQUFDO2dCQUN4QkQsYUFBYUMsVUFBVSxDQUFDO1lBQzFCLFNBQVU7Z0JBQ1JILGFBQWE7WUFDZjtRQUNGO1FBRUFhO0lBQ0YsR0FBRyxFQUFFO0lBRUwsTUFBTU8sUUFBUTtRQUNaekI7UUFDQUU7UUFDQXdCLGlCQUFpQixDQUFDLENBQUN4QjtRQUNuQkU7UUFDQUs7UUFDQUg7UUFDQVM7SUFDRjtJQUVBLHFCQUFPLDhEQUFDbkIsWUFBWStCLFFBQVE7UUFBQ0YsT0FBT0E7a0JBQVExQjs7Ozs7O0FBQzlDLEVBQUU7QUFFSyxNQUFNNkIsVUFBVTtJQUNyQixNQUFNQyxVQUFVckMsaURBQVVBLENBQUNJO0lBQzNCLElBQUlpQyxZQUFZaEMsV0FBVztRQUN6QixNQUFNLElBQUlpQyxNQUFNO0lBQ2xCO0lBQ0EsT0FBT0Q7QUFDVCxFQUFFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc2loLTI1MTk5LWZyb250ZW5kLy4vc3JjL2NvbnRleHQvQXV0aENvbnRleHQudHN4PzZlZTQiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IGNyZWF0ZUNvbnRleHQsIHVzZUNvbnRleHQsIHVzZVN0YXRlLCB1c2VFZmZlY3QsIFJlYWN0Tm9kZSwgdXNlQ2FsbGJhY2sgfSBmcm9tICdyZWFjdCc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFVzZXIge1xyXG4gIGlkOiBzdHJpbmc7XHJcbiAgZW1haWw6IHN0cmluZztcclxuICByb2xlOiAnYWRtaW4nIHwgJ3VzZXInIHwgJ21hbmFnZXInO1xyXG4gIGZpcnN0TmFtZT86IHN0cmluZztcclxuICBsYXN0TmFtZT86IHN0cmluZztcclxufVxyXG5cclxuaW50ZXJmYWNlIEF1dGhDb250ZXh0VHlwZSB7XHJcbiAgdXNlcjogVXNlciB8IG51bGw7XHJcbiAgdG9rZW46IHN0cmluZyB8IG51bGw7XHJcbiAgaXNBdXRoZW50aWNhdGVkOiBib29sZWFuO1xyXG4gIGlzTG9hZGluZzogYm9vbGVhbjtcclxuICBsb2dpbjogKHVzZXJEYXRhOiBVc2VyLCB0b2tlbjogc3RyaW5nKSA9PiB2b2lkO1xyXG4gIGxvZ291dDogKCkgPT4gdm9pZDtcclxuICB1cGRhdGVVc2VyOiAodXNlckRhdGE6IFBhcnRpYWw8VXNlcj4pID0+IHZvaWQ7XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBBdXRoQ29udGV4dCA9IGNyZWF0ZUNvbnRleHQ8QXV0aENvbnRleHRUeXBlIHwgdW5kZWZpbmVkPih1bmRlZmluZWQpO1xyXG5cclxuZXhwb3J0IGNvbnN0IEF1dGhQcm92aWRlcjogUmVhY3QuRkM8eyBjaGlsZHJlbjogUmVhY3ROb2RlIH0+ID0gKHsgY2hpbGRyZW4gfSkgPT4ge1xyXG4gIGNvbnN0IFt1c2VyLCBzZXRVc2VyXSA9IHVzZVN0YXRlPFVzZXIgfCBudWxsPihudWxsKTtcclxuICBjb25zdCBbdG9rZW4sIHNldFRva2VuXSA9IHVzZVN0YXRlPHN0cmluZyB8IG51bGw+KG51bGwpO1xyXG4gIGNvbnN0IFtpc0xvYWRpbmcsIHNldElzTG9hZGluZ10gPSB1c2VTdGF0ZTxib29sZWFuPih0cnVlKTtcclxuXHJcbiAgY29uc3QgbG9nb3V0ID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ2F1dGhUb2tlbicpO1xyXG4gICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ2F1dGhVc2VyJyk7XHJcbiAgICBzZXRVc2VyKG51bGwpO1xyXG4gICAgc2V0VG9rZW4obnVsbCk7XHJcbiAgICBzZXRJc0xvYWRpbmcoZmFsc2UpO1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgY29uc3QgbG9naW4gPSB1c2VDYWxsYmFjaygodXNlckRhdGE6IFVzZXIsIGF1dGhUb2tlbjogc3RyaW5nKSA9PiB7XHJcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnYXV0aFRva2VuJywgYXV0aFRva2VuKTtcclxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdhdXRoVXNlcicsIEpTT04uc3RyaW5naWZ5KHVzZXJEYXRhKSk7XHJcbiAgICBzZXRVc2VyKHVzZXJEYXRhKTtcclxuICAgIHNldFRva2VuKGF1dGhUb2tlbik7XHJcbiAgICBzZXRJc0xvYWRpbmcoZmFsc2UpO1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgY29uc3QgdXBkYXRlVXNlciA9IHVzZUNhbGxiYWNrKCh1c2VyRGF0YTogUGFydGlhbDxVc2VyPikgPT4ge1xyXG4gICAgc2V0VXNlcigocHJldikgPT4ge1xyXG4gICAgICBpZiAoIXByZXYpIHJldHVybiBudWxsO1xyXG4gICAgICBjb25zdCB1cGRhdGVkID0geyAuLi5wcmV2LCAuLi51c2VyRGF0YSB9O1xyXG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnYXV0aFVzZXInLCBKU09OLnN0cmluZ2lmeSh1cGRhdGVkKSk7XHJcbiAgICAgIHJldHVybiB1cGRhdGVkO1xyXG4gICAgfSk7XHJcbiAgfSwgW10pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgY29uc3QgaW5pdGlhbGl6ZUF1dGggPSAoKSA9PiB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3Qgc3RvcmVkVG9rZW4gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnYXV0aFRva2VuJyk7XHJcbiAgICAgICAgY29uc3Qgc3RvcmVkVXNlciA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdhdXRoVXNlcicpO1xyXG5cclxuICAgICAgICBpZiAoc3RvcmVkVG9rZW4gJiYgc3RvcmVkVXNlcikge1xyXG4gICAgICAgICAgc2V0VG9rZW4oc3RvcmVkVG9rZW4pO1xyXG4gICAgICAgICAgc2V0VXNlcihKU09OLnBhcnNlKHN0b3JlZFVzZXIpKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcignU2Vzc2lvbiByZXN0b3JhdGlvbiBmYWlsZWQ6JywgZXJyb3IpO1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdhdXRoVG9rZW4nKTtcclxuICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnYXV0aFVzZXInKTtcclxuICAgICAgfSBmaW5hbGx5IHtcclxuICAgICAgICBzZXRJc0xvYWRpbmcoZmFsc2UpO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGluaXRpYWxpemVBdXRoKCk7XHJcbiAgfSwgW10pO1xyXG5cclxuICBjb25zdCB2YWx1ZSA9IHtcclxuICAgIHVzZXIsXHJcbiAgICB0b2tlbixcclxuICAgIGlzQXV0aGVudGljYXRlZDogISF0b2tlbixcclxuICAgIGlzTG9hZGluZyxcclxuICAgIGxvZ2luLFxyXG4gICAgbG9nb3V0LFxyXG4gICAgdXBkYXRlVXNlcixcclxuICB9O1xyXG5cclxuICByZXR1cm4gPEF1dGhDb250ZXh0LlByb3ZpZGVyIHZhbHVlPXt2YWx1ZX0+e2NoaWxkcmVufTwvQXV0aENvbnRleHQuUHJvdmlkZXI+O1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IHVzZUF1dGggPSAoKTogQXV0aENvbnRleHRUeXBlID0+IHtcclxuICBjb25zdCBjb250ZXh0ID0gdXNlQ29udGV4dChBdXRoQ29udGV4dCk7XHJcbiAgaWYgKGNvbnRleHQgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKCd1c2VBdXRoIG11c3QgYmUgdXNlZCB3aXRoaW4gYW4gQXV0aFByb3ZpZGVyJyk7XHJcbiAgfVxyXG4gIHJldHVybiBjb250ZXh0O1xyXG59OyJdLCJuYW1lcyI6WyJSZWFjdCIsImNyZWF0ZUNvbnRleHQiLCJ1c2VDb250ZXh0IiwidXNlU3RhdGUiLCJ1c2VFZmZlY3QiLCJ1c2VDYWxsYmFjayIsIkF1dGhDb250ZXh0IiwidW5kZWZpbmVkIiwiQXV0aFByb3ZpZGVyIiwiY2hpbGRyZW4iLCJ1c2VyIiwic2V0VXNlciIsInRva2VuIiwic2V0VG9rZW4iLCJpc0xvYWRpbmciLCJzZXRJc0xvYWRpbmciLCJsb2dvdXQiLCJsb2NhbFN0b3JhZ2UiLCJyZW1vdmVJdGVtIiwibG9naW4iLCJ1c2VyRGF0YSIsImF1dGhUb2tlbiIsInNldEl0ZW0iLCJKU09OIiwic3RyaW5naWZ5IiwidXBkYXRlVXNlciIsInByZXYiLCJ1cGRhdGVkIiwiaW5pdGlhbGl6ZUF1dGgiLCJzdG9yZWRUb2tlbiIsImdldEl0ZW0iLCJzdG9yZWRVc2VyIiwicGFyc2UiLCJlcnJvciIsImNvbnNvbGUiLCJ2YWx1ZSIsImlzQXV0aGVudGljYXRlZCIsIlByb3ZpZGVyIiwidXNlQXV0aCIsImNvbnRleHQiLCJFcnJvciJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/context/AuthContext.tsx\n");

/***/ }),

/***/ "./src/pages/_app.tsx":
/*!****************************!*\
  !*** ./src/pages/_app.tsx ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ App)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../styles/globals.css */ \"./src/styles/globals.css\");\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles_globals_css__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _context_AuthContext__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../context/AuthContext */ \"./src/context/AuthContext.tsx\");\n\n\n\nfunction App({ Component, pageProps }) {\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_context_AuthContext__WEBPACK_IMPORTED_MODULE_2__.AuthProvider, {\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n            ...pageProps\n        }, void 0, false, {\n            fileName: \"C:\\\\Users\\\\manos\\\\OneDrive\\\\Desktop\\\\My Projects\\\\SIH_25199\\\\frontend\\\\src\\\\pages\\\\_app.tsx\",\n            lineNumber: 8,\n            columnNumber: 7\n        }, this)\n    }, void 0, false, {\n        fileName: \"C:\\\\Users\\\\manos\\\\OneDrive\\\\Desktop\\\\My Projects\\\\SIH_25199\\\\frontend\\\\src\\\\pages\\\\_app.tsx\",\n        lineNumber: 7,\n        columnNumber: 5\n    }, this);\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvcGFnZXMvX2FwcC50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUErQjtBQUV1QjtBQUV2QyxTQUFTQyxJQUFJLEVBQUVDLFNBQVMsRUFBRUMsU0FBUyxFQUFZO0lBQzVELHFCQUNFLDhEQUFDSCw4REFBWUE7a0JBQ1gsNEVBQUNFO1lBQVcsR0FBR0MsU0FBUzs7Ozs7Ozs7Ozs7QUFHOUIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zaWgtMjUxOTktZnJvbnRlbmQvLi9zcmMvcGFnZXMvX2FwcC50c3g/ZjlkNiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJy4uL3N0eWxlcy9nbG9iYWxzLmNzcyc7XG5pbXBvcnQgdHlwZSB7IEFwcFByb3BzIH0gZnJvbSAnbmV4dC9hcHAnO1xuaW1wb3J0IHsgQXV0aFByb3ZpZGVyIH0gZnJvbSAnLi4vY29udGV4dC9BdXRoQ29udGV4dCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEFwcCh7IENvbXBvbmVudCwgcGFnZVByb3BzIH06IEFwcFByb3BzKSB7XG4gIHJldHVybiAoXG4gICAgPEF1dGhQcm92aWRlcj5cbiAgICAgIDxDb21wb25lbnQgey4uLnBhZ2VQcm9wc30gLz5cbiAgICA8L0F1dGhQcm92aWRlcj5cbiAgKTtcbn1cbiJdLCJuYW1lcyI6WyJBdXRoUHJvdmlkZXIiLCJBcHAiLCJDb21wb25lbnQiLCJwYWdlUHJvcHMiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/pages/_app.tsx\n");

/***/ }),

/***/ "./src/styles/globals.css":
/*!********************************!*\
  !*** ./src/styles/globals.css ***!
  \********************************/
/***/ (() => {



/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-dev-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./src/pages/_app.tsx"));
module.exports = __webpack_exports__;

})();