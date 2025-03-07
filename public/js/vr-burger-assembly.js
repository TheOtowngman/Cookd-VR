AFRAME.registerComponent('vr-burger-assembly', {
    init: function(){
        const Context_AF = this;
        //Get the elements of the burger.
        const burgerElements = this.el.components['vr-burger-info'].data.burgerElements;
        
        //An event listener for a collision event.
        Context_AF.el.addEventListener('collide', function(evt){
            //Check to see if the collided entity has a class of grabbable and is a burger element.
            if(evt.detail.body.el.getAttribute('class') == 'grabbable' && evt.detail.body.el.getAttribute('vr-element-info') != null){
                const collidedEl = evt.detail.body.el;
                
                if(collidedEl.components['vr-element-info'].data.elemType == 2){
                    if(collidedEl.components['vr-patty-info'].data.pattyCooked){
                        Context_AF.assembleBurger(collidedEl);
                    }
                }
                else{
                    Context_AF.assembleBurger(collidedEl);
                }
            }
        });
    },

    assembleBurger : function(collidedEl){
        //Get all of the current elements of the burger.
        var prevElements = this.el.components['vr-burger-info'].data.burgerElements;

        //Append the new burger element to the previous array of elements.
        var newArr = prevElements.concat(collidedEl.components['vr-element-info'].data.elemType);
        //Sort the array.
        newArr = newArr.sort();
        //Then convert it to a string to compare.
        strNewArr = newArr.toString();

        //Get all of the possible combinations from the game manager.
        const possibleCombos = document.querySelector('#gameManager').components['vr-game-manager'].data.burgerCombinations;
        //A bool that keeps track of if a combo has been found.
        var comboFound = false;
        
        //Go through all of the possible combinations and if there is a matching combination, then break out of the loop and say there is a combo.
        for(i = 0; i < possibleCombos.length; i++){
            const strCombo = possibleCombos[i].toString();
            if(strNewArr == strCombo){
                comboFound = true;
                break;
            }
        }
        
        //If there was a combo found, then make a new entity that has that combination, then update the entity array.
        if(comboFound){
            let bgrElem = document.createElement('a-obj-model');
            bgrElem.setAttribute('id', this.el.getAttribute('id'));
            bgrElem.setAttribute('class', 'grabbable');
            //Set the object to the combination.
            bgrElem.setAttribute('src', '#' + newArr.join('_') + 'Obj');
            console.log('#' + newArr.join('_') + 'Obj');
            bgrElem.setAttribute('material', 'src:/assets/models/mtl/burgerMap.png');
            bgrElem.setAttribute('dynamic-body', '');
            bgrElem.setAttribute('scale', '0.02 0.02 0.02');
            bgrElem.setAttribute('position', this.el.getAttribute('position'));
            bgrElem.setAttribute('vr-burger-info', '');
            bgrElem.setAttribute('vr-burger-assembly', '');

            document.querySelector('#' + this.el.getAttribute('id')).components['vr-burger-info'].data.burgerElements = newArr;
            
            //If the collided enetity was a patty and it was underCooked, then add an atribute saying the burger is underCooked.
            if(collidedEl.components['vr-element-info'].data.elemType == 2){
                if(collidedEl.components['vr-patty-info'].data.pattyCooked != true){
                    if(collidedEl.components['vr-patty-info'].data.pattyOvercooked == true){
                        this.el.getAttribute('id').components['vr-burger-info'].data.overCooked = true;
                        this.el.getAttribute('id').components['vr-burger-info'].data.underCooked = false;
                    }
                    else{
                        this.el.components['vr-burger-info'].data.underCooked = true;
                        this.el.components['vr-burger-info'].data.overCooked = false;
                    }
                }
            }
            
            //Delete the old element and the collided one, then make the new one.
            this.el.parentNode.removeChild(this.el);
            collidedEl.parentNode.removeChild(collidedEl);
            let scene = document.querySelector('a-scene');
            scene.appendChild(bgrElem);
        }
    },
})