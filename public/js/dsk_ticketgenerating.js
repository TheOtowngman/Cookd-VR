AFRAME.registerComponent('dsk_ticketgenerating', {
    schema: {
        burger: {type:'boolean', default: false},
        Big_mac: {type:'boolean', default: false},
        RonsCreamySurprise: {type:'boolean', default: false},
        positionx: {type:'number', default:0},
        positiony: {type:'number', default:0},
    },

    init : function() {
        const Context_AF = this;


        let NPC = document.querySelector('#npc');
        
        Context_AF.data.positionx = NPC.getAttribute('position').x;
        Context_AF.data.positiony = NPC.getAttribute('position').y;
        
        //console.log(Context_AF.el.data.positiony);
        rand = Math.floor(Math.random() * 3) + 1;
        if(rand == 1)
        {
            Context_AF.el.setAttribute('burger', {});
            Context_AF.data.burger = true;
        }
        if(rand == 2)
        {
            Context_AF.el.setAttribute('bigmac', {});
            Context_AF.data.Big_mac = true;
        }
        if(rand == 3)
        {
            Context_AF.el.setAttribute('RonsCreamySurprise', {});
            Context_AF.data.RonsCreamySurprise = true;
        }
    
    
    },
})
AFRAME.registerComponent('burger', {
    schema: {
        price: {type:'number', default:10},
        ingredient: {type:'string', default:'bun,patty,bun'}
    },
    init : function() {
        const Context_AF = this;
        
        console.log(Context_AF.data.ingredient);

        
    },
});
AFRAME.registerComponent('bigmac', {
    schema: {
        price: {type:'number', default:5},
        ingredient: {type:'string', default:'bun,patty,lettuce,sauce,bun'}
    },
    init : function() {
        const Context_AF = this;
        Context_AF.data.price = 2;
        console.log(Context_AF.data.ingredient);

        
    },
});

AFRAME.registerComponent('RonsCreamySurprise', {
    schema: {
        price: {type:'number', default:0},
        ingredient: {type:'string', default:'Mayo'}
    },
    init : function() {
        const Context_AF = this;
        
        console.log(Context_AF.data.ingredient);

        
    },
});