let filterbtns = document.querySelectorAll(".category");



filterbtns.forEach((btn)=>{
    btn.addEventListener("click",async()=>{
        let findCategory = btn.getAttribute("data-category");
        let response = await fetch(`/listings/category/${findCategory}`);
        let filteredListings = await response.json();
        console.log(filteredListings);


        let listingsContainer = document.querySelector(".index-listings");
        listingsContainer.innerHTML = "";

        

        filteredListings.forEach((listing) => {
            let listingCard = document.createElement("div");
            listingCard.classList.add("card", "index-page-card");
            listingCard.style.backgroundColor = "#f8ebd3";


            let cardImgTopWrapper = document.createElement("div");
            cardImgTopWrapper.classList.add("card-img-top-wrapper");
            cardImgTopWrapper.style.backgroundColor = "#fbfae5";
            
            

            let img = document.createElement("img");
            img.classList.add("card-img-top");
            img.src = listing.image.url;
            img.alt = "Listing Image";
            img.style.height = "18rem";

            let cardBody = document.createElement("div");
            cardBody.classList.add("card-body", "index-card-body");

            let cardText = document.createElement("p");
            cardText.classList.add("card-text");
            cardText.innerHTML = `<b><i>${listing.title}</i></b><br>&#8377; ${listing.price.toLocaleString("en-IN")} / night  <i class="tax-info">&nbsp; +18% GST</i>`;

            cardBody.appendChild(cardText);
            cardImgTopWrapper.appendChild(img);
            listingCard.appendChild(cardImgTopWrapper);
            listingCard.appendChild(cardBody);
            listingsContainer.appendChild(listingCard);

            listingCard.addEventListener("click", () => {
                window.location.href = `/listings/${listing._id}`;  
            });

          
        });

    });
});
