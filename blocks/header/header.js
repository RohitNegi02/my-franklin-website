import { getMetadata, decorateIcons } from "../../scripts/lib-franklin.js";

// media query match that indicates mobile/tablet width
const isDesktop = window.matchMedia("(min-width: 900px)");

function closeOnEscape(e) {
  if (e.code === "Escape") {
    const nav = document.getElementById("nav");
    const navSections = nav.querySelector(".nav-sections");
    const navSectionExpanded = navSections.querySelector(
      '[aria-expanded="true"]'
    );
    if (navSectionExpanded && isDesktop.matches) {
      // eslint-disable-next-line no-use-before-define
      toggleAllNavSections(navSections);
      navSectionExpanded.focus();
    } else if (!isDesktop.matches) {
      // eslint-disable-next-line no-use-before-define
      toggleMenu(nav, navSections);
      nav.querySelector("button").focus();
    }
  }
}

function openOnKeydown(e) {
  const focused = document.activeElement;
  const isNavDrop = focused.className === "nav-drop";
  if (isNavDrop && (e.code === "Enter" || e.code === "Space")) {
    const dropExpanded = focused.getAttribute("aria-expanded") === "true";
    // eslint-disable-next-line no-use-before-define
    toggleAllNavSections(focused.closest(".nav-sections"));
    focused.setAttribute("aria-expanded", dropExpanded ? "false" : "true");
  }
}

function focusNavSection() {
  document.activeElement.addEventListener("keydown", openOnKeydown);
}

/**
 * Toggles all nav sections
 * @param {Element} sections The container element
 * @param {Boolean} expanded Whether the element should be expanded or collapsed
 */
function toggleAllNavSections(sections, expanded = false) {
  sections.querySelectorAll(".nav-sections > ul > li").forEach((section) => {
    section.setAttribute("aria-expanded", expanded);
  });
}

/**
 * Toggles the entire nav
 * @param {Element} nav The container element
 * @param {Element} navSections The nav sections within the container element
 * @param {*} forceExpanded Optional param to force nav expand behavior when not null
 */
function toggleMenu(nav, navSections, forceExpanded = null) {
  const expanded =
    forceExpanded !== null
      ? !forceExpanded
      : nav.getAttribute("aria-expanded") === "true";
  const button = nav.querySelector(".nav-hamburger button");
  document.body.style.overflowY = expanded || isDesktop.matches ? "" : "hidden";
  nav.setAttribute("aria-expanded", expanded ? "false" : "true");
  toggleAllNavSections(
    navSections,
    expanded || isDesktop.matches ? "false" : "true"
  );
  button.setAttribute(
    "aria-label",
    expanded ? "Open navigation" : "Close navigation"
  );
  // enable nav dropdown keyboard accessibility
  const navDrops = navSections.querySelectorAll(".nav-drop");
  if (isDesktop.matches) {
    navDrops.forEach((drop) => {
      if (!drop.hasAttribute("tabindex")) {
        drop.setAttribute("role", "button");
        drop.setAttribute("tabindex", 0);
        drop.addEventListener("focus", focusNavSection);
      }
    });
  } else {
    navDrops.forEach((drop) => {
      drop.removeAttribute("role");
      drop.removeAttribute("tabindex");
      drop.removeEventListener("focus", focusNavSection);
    });
  }
  // enable menu collapse on escape keypress
  if (!expanded || isDesktop.matches) {
    // collapse menu on escape press
    window.addEventListener("keydown", closeOnEscape);
  } else {
    window.removeEventListener("keydown", closeOnEscape);
  }
}

/**
 * decorates the header, mainly the nav
 * @param {Element} block The header block element
 */
export default async function decorate(block) {
  //get Weather

  // fetch nav content
  const navMeta = getMetadata("nav");
  const navPath = navMeta ? new URL(navMeta).pathname : "/nav";
  const resp = await fetch(`${navPath}.plain.html`);

  if (resp.ok) {
    const html = await resp.text();

    // decorate nav DOM
    const nav = document.createElement("nav");
    nav.id = "nav";
    nav.innerHTML = html;

    const classes = ["brand", "sections", "tools"];
    classes.forEach((c, i) => {
      const section = nav.children[i];
      if (section) section.classList.add(`nav-${c}`);
    });

    const navSections = nav.querySelector(".nav-sections");
    if (navSections) {
      navSections.querySelectorAll(":scope > ul > li").forEach((navSection) => {
        if (navSection.querySelector("ul"))
          navSection.classList.add("nav-drop");
        navSection.addEventListener("click", () => {
          if (isDesktop.matches) {
            const expanded =
              navSection.getAttribute("aria-expanded") === "true";
            toggleAllNavSections(navSections);
            navSection.setAttribute(
              "aria-expanded",
              expanded ? "false" : "true"
            );
          }
        });
      });
    }
    //weather

    // var myHeaders = new Headers();
    // myHeaders.append("key", "d0dd193a59ae446787a123251232111");

    // var requestOptions = {
    //   method: "GET",
    //   headers: myHeaders,
    //   redirect: "follow",
    // };

    // fetch("https://api.weatherapi.com/v1/current.json?q=paris", requestOptions)
    //   .then((response) => response.json())
    //   .then((result) => {
    //     const markup = document.createElement("div");
    //     markup.classList.add("weather");
    //     markup.innerHTML = `Temp ${result.current.temp_c}°C`;
    //     nav.append(markup);
    //   })
    //   .catch((error) => console.log("error", error));
    //Login
    Window.onload = handlePrimeLogIn();
    function getCookie() {
      let name = "access_token" + "=";
      let decodedCookie = decodeURIComponent(document.cookie);
      let ca = decodedCookie.split(";");
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == " ") {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    }
    async function handlePrimeLogIn() {
      //  const markup = document.createElement("button");
      //     markup.setAttribute("id", "myButton");
      //     markup.innerHTML = "LOG IN";
      //     markup.addEventListener("click", getCpOauthUrl());
      // nav.append(markup);
     // const isLoggedIn = this.isLoggedIn();
      const currentUrl = new URL(window.location.href);
      const code = currentUrl.searchParams.get("code");
      const course = currentUrl.searchParams.get("course");
if(course==null){
  return;
}
      if (code) {
        await fetchToken(code,course);
      } else {
        if (getCookie() == "") {
          const markup = document.createElement("button");
          markup.setAttribute("id", "myButton");
          markup.innerHTML = "LOG IN";
          markup.addEventListener("click",  getCpOauthUrl(course) );
        //  nav.append(markup);
        }else{
          const accessToken=getCookie();
           getCourse(accessToken,course);
        }
       }
      //document.getElementById("myButton").onclick = getCpOauthUrl;
    }
    async function fetchToken(code,course) {
      var requestOptions = {
        method: "POST",
        redirect: "follow",
      };

      fetch(
        `https://learningmanager.adobe.com/oauth/token?client_id=62f33554-103c-4fcb-b68c-d35c1d3da6a5&client_secret=1af6582a-175e-4499-82c6-c250c953f368&refresh_token=dcca7da80d5c17dd6360d9f95c449783&code=${code}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          document.cookie = "access_token" + "=" + (result.access_token || "");
          console.log(result.access_token);
          getCourse(result.access_token,course);
        })
        .catch((error) => console.log("error", error));
    }
    function getCourse(access_token,course){
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", `Bearer ${access_token}`);
 console.log(access_token);
const requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow"
};

fetch(`https://learningmanager.adobe.com/primeapi/v2/learningObjects/course:${course}`, requestOptions)
  .then((response) => response.json())
  .then((result) => {console.log(result.data.relationships.instances.data[0].id);
      const instId=result.data.relationships.instances.data[0].id;
       enrollUser(access_token,instId,course);
                    })
  .catch((error) => console.error(error));
    }

    function enrollUser(access_token,instance,course){
      const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", `Bearer ${access_token}`);

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  redirect: "follow"
};

fetch(`https://learningmanager.adobe.com/primeapi/v2/enrollments?loId=course:${course}&loInstanceId=${instance}`, requestOptions)
  .then((response) => response.json())
  .then((result) => {console.log("User Enrolled");
                    playPlayer(access_token,course,instance);
                    })
  .catch((error) => console.error(error));
    }
    function getCpOauthUrl(course) {
      console.log("hello");
      document.location.href =
        `https://learningmanager.adobe.com/oauth/o/authorize?account=121816&client_id=62f33554-103c-4fcb-b68c-d35c1d3da6a5&redirect_uri=https://main--my-franklin-website--rohitnegi02.hlx.page?course=${course}&state=prime_auth&scope=learner:read,learner:write&response_type=CODE&logoutAfterAuthorize=false`;
    }

    function playPlayer(access_token,course,instance) {
      console.log("hello");
    //  document.location.href =
      //  `https://learningmanager.adobe.com//app/player?&user_id=20986942&account_id=121816&csrf_token=${access_token}&is_staged=false&preview=true&no_reporting=true&is_native=true&course_id=course:${course}&module_id=${instance}`;
  // `https://captivateprime.adobe.com/app/player?lo_id=course:${course}&access_token=${access_token}`
  var iframe = document.createElement('iframe');

            // Set attributes for the iframe
            iframe.src = `https://captivateprime.adobe.com/app/player?lo_id=course:${course}&access_token=${access_token}`; // Replace with the desired URL
           
            iframe.allowFullscreen = true;
           // iframe.allowFullscreen = true;

            // Append the iframe to the body or another container element
            document.body.appendChild(iframe);
      
        }
    // hamburger for mobile
    const hamburger = document.createElement("div");
    hamburger.classList.add("nav-hamburger");
    hamburger.innerHTML = `<button type="button" aria-controls="nav" aria-label="Open navigation">
        <span class="nav-hamburger-icon"></span>
      </button>`;
    hamburger.addEventListener("click", () => toggleMenu(nav, navSections));
    nav.prepend(hamburger);
    nav.setAttribute("aria-expanded", "false");
    // prevent mobile nav behavior on window resize
    toggleMenu(nav, navSections, isDesktop.matches);
    isDesktop.addEventListener("change", () =>
      toggleMenu(nav, navSections, isDesktop.matches)
    );

    decorateIcons(nav);
    const navWrapper = document.createElement("div");
    navWrapper.className = "nav-wrapper";
    navWrapper.append(nav);
    block.append(navWrapper);
  }
}
