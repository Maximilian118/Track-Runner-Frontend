// Return an int based on current endpoint.
export const initNavValue = location => {
  switch (location.pathname) {
    case "/": return 2
    case "/calendar": return 3
    default: return 0
  }
}

// An Array of tab data to be mapped through.
export const protectedTabs = [
  {
    label: "Home",
    endpoint: "/",
    index: 2,
  },
  {
    label: "Calendar",
    endpoint: "/calendar",
    index: 3,
  },
]