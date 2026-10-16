import { defineWidget } from "@groovepost/app-sdk";
export const Countdown = defineWidget({id:"countdown",routes:[{id:"root",path:"/"}],
  mount(element, context) {
    const heading = document.createElement("h1"),
      time = document.createElement("p");
    heading.textContent = String(context.options.title || "New release");
    element.append(heading, time);
    const refresh = () => {
      const date = Date.parse(String(context.options.releaseDate));
      time.textContent = Number.isFinite(date)
        ? `${Math.max(0, Math.ceil((date - Date.now()) / 86400000))} days to go`
        : "Set a release date";
    };
    refresh();
    const timer = setInterval(refresh, 60000);
    return () => clearInterval(timer);
  },
});
