// debounce logic
Object.defineProperty(Object, 'debounce', {
    value: function(callback, timeout){
            let timeout_id;
            return function(thisArg){
                if(timeout_id){
                    clearTimeout(timeout_id)
                }
                timeout_id = setTimeout(callback.bind(this, thisArg), timeout);
            }
    },

    enumerable: true,
    writable: true,
    configurable: true
})


class StarRating{
    
    /* constructor function
        @arg1: Rating Scale ie. number of stars
        @arg2: Target container
    */
    constructor(ratingScale, containerName){
        this.scale = ratingScale
        this.containerName = containerName
        this.rating = 0
        this.createStarsAndAppend()

        let currentRatingContainer = document.createElement('div')
        currentRatingContainer.setAttribute('class', 'current-rating')
        currentRatingContainer.innerHTML = "No Ratings yet"
        document.querySelector('.bookrating').appendChild(currentRatingContainer)
    }

    // clears rating
    clearRating(){
        console.log('clicked');
        document.querySelectorAll('.' + this.containerName + " > .star").forEach(function(node){
            node.classList.remove('selected')
        })
        this.rating = 0
        document.querySelector('.current-rating').innerHTML = "No Ratings yet"
    }

    // main logic on every star click
    starClick(thisArg){
        let starIndex = this.attributes['id'].value.split('-')[0] // get the star index from id attribute
        let stars = document.querySelectorAll('.' + thisArg.containerName + " > .star")  
        thisArg.rating = 0

        /* Iterate over all star nodes
        and select until clicked star + increase the rating
        and unselect remaining stars
        */
        stars.forEach(function(star, index){
            if(index < starIndex){
                stars[index].classList.add("selected")
                thisArg.rating+=1
            }
            else{
                stars[index].classList.remove("selected")
            }
        })

        // display the current rating
        document.querySelector('.current-rating').innerHTML = "Your current rating is: " + thisArg.rating
    }

    // Logic for intial creation of star nodes and appending to DOM 
    createStarsAndAppend(){
        let starContainer;
        try{
            starContainer = document.querySelector('.' + this.containerName)
            if(!starContainer){
                throw new Error(`${this.container} class doesn't exist! `)
            }

            /*  1. Iterate until given number of stars and create star nodes
                2. Attach the event listeners with DEBOUNCED CALLBACK FUNCTIONS
                3. Append to the DOM
             */
            for(let i = 1; i <= this.scale; i++){
                let star = document.createElement('span')
                star.setAttribute('class', 'star')
                star.setAttribute('id', i+"-"+this.containerName)
                let thisArg = this
                let debouncedFn = Object.debounce(this.starClick, 200)
                star.addEventListener('click', function(){
                    debouncedFn.call(this, thisArg)
                })
                starContainer.appendChild(star)
            }

            // Attaching event listener for clear rating debounced function 
            let debouncedFn = Object.debounce(this.clearRating, 200)
            document.querySelector(".clearRatingBtn").addEventListener('click', debouncedFn.bind(this))

        }
        catch(err){
            console.error(err.name + ": " + err.message);
        }

    }
    
}

// instantiate the class

new StarRating(5, 'star-container-1')