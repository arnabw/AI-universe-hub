const allDataLoad = (showAll = true, sortAll = false) => {
  fetch("https://openapi.programming-hero.com/api/ai/tools")
    .then((res) => res.json())
    .then((data) => dataDisplay(data.data.tools, showAll, sortAll))
    .catch((err) => console.error("Error Happened", err));
};

const dataDisplay = (tools, showAll, sortAll) => {
  const dataDisplay = document.getElementById("dataDisplay");
  dataDisplay.innerHTML = "";

  if (!!showAll) {
    tools = tools.slice(0, 6);
  }
  if (!!sortAll) {
    tools.sort((a, b) => {
      const [day1, month1, year1] = a.published_in.split("/").map(Number);
      const [day2, month2, year2] = b.published_in.split("/").map(Number);
      if (year1 != year2) return year2 - year1;
      if (month1 != month2) return month2 - month1;

      return day2 - day1;
    });
  }
  tools.forEach((tool) => {
    const article = document.createElement("article");
    article.className = "space-y-3 border border-[#1717171A] p-6 rounded-2xl";
    article.innerHTML = `
    <div>
    <img
      class="w-full object-cover h-72 rounded-2xl"
      src="${tool?.image}"
      alt=""
    />
  </div>
  <div class="space-y-3">
    <h2 class="text-[#111] text-2xl font-semibold">Features</h2>
    <ul class="list-decimal text-[#585858] ml-3">
      <li>${tool?.features[0]}</li>
      <li>${tool?.features[1]}</li>
      <li>${tool?.features[2]}</li>
    </ul>
    <hr />
  </div>
  <div class="space-y-3 flex flex-col">
    <h2 class="text-[#111] text-2xl font-semibold">${tool?.name}</h2>
    <button
      onclick="singleData()"
      class="bg-[#FEF7F7] text-[#EB5757] p-1 rounded-full text-2xl ml-auto"
    >
      <i class="fa-solid fa-arrow-right"></i>
    </button>
    <p class="font-medium text-[#585858]">
      <i class="fa-regular fa-calendar-days"></i> ${tool?.published_in}
    </p>
  </div>
    `;
    dataDisplay.appendChild(article);
  });
};

function sortBtn() {
  allDataLoad(true, true);
}
function allBtn() {
  allDataLoad(false, false);
  document.getElementById("allBtn").classList.add("hidden");
}

function singleData() {}

allDataLoad();
