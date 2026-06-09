export function showToast(
  message,
  duration = 3000
) {

  const existingToast =
    document.querySelector(".toast");

  if (existingToast) {
    existingToast.remove();
  }

  const toast =
    document.createElement("div");

  toast.className = "toast";

  toast.textContent = message;

  document.body.appendChild(toast);

  setTimeout(() => {

    toast.classList.add("show");

  }, 100);

  setTimeout(() => {

    toast.classList.remove("show");

    setTimeout(() => {

      toast.remove();

    }, 300);

  }, duration);

}