<script>
  import { mobileDeviceStore } from "../stores";

  let mql = window.matchMedia("(max-width:600px)"); // target mobile devices
  if (mql.matches) {
    // case small screen
    mobileDeviceStore.update(() => true);
  } else {
    // case big screen
    mobileDeviceStore.update(() => false);
  }

  // event listener for change of screen size
  mql.onchange = (e) => {
    if (e.matches) {
      mobileDeviceStore.update(() => true);
    } else {
      mobileDeviceStore.update(() => false);
    }
  };
</script>
