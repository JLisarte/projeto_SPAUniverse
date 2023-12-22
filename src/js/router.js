export class Router {
  routes = {}

  add(routeName, page) {
    this.routes[routeName] = page
  }

  route(event) {
    event.preventDefault()

    const target = event.target || event.srcElement
    const route = target.getAttribute("href") 

    window.history.pushState({}, "", route)

    this.handle(route) 
  }

  handle(route) {
    const validRoute = route || window.location.pathname
    const selectedRoute = this.routes[validRoute] || this.routes[404]

    fetch(selectedRoute)
      .then((data) => data.text())
      .then((html) => {
        document.querySelector("#app").innerHTML = html
      })
  }
}
