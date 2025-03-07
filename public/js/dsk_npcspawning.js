AFRAME.registerComponent('dsk_npcspawning', {
    schema: {
        counter: {type:'number', default:0},
        hasspawned: {type:'boolean', default: false},
        tabletaken: {type:'array', default:[
           
        ]},
        
    },
    init : function() {
        const Context_AF = this;
    },
    tick : function(time, deltaTime){
        //counts in real time. Every real 30 seconds, do the thing
        let Context_AF = this;
        let d = new Date();
        let n = d.getSeconds();
        //console.log(n);
        if(n == 30 && !Context_AF.data.hasspawned || 
            n == 0 && !Context_AF.data.hasspawned)
        {
            //spawns the npc
            Context_AF.data.hasspawned = true;
            Context_AF.SpawnNPC();
        }
        //prevents multiple npcs from spawning
        if(Context_AF.data.hasspawned && n == 31 ||
            Context_AF.data.hasspawned && n == 1)
            {
                Context_AF.data.hasspawned = false;
            }
    },
    SpawnNPC: function()
    {
        let Context_AF = this;
        
        //generates a random number to determine which table the npc will spawn at.
        randposition = Math.floor(Math.random() * 8);
        let id = randposition + 1;
        //grabs the table name and table iteself.
        let table = document.querySelector('#table' + id);
        let tablename = table.getAttribute('id');
        //grabs the table position
        tablepos = table.getAttribute('position');
        //spawns npc and adds varibles to where they need to be added
        Context_AF.data.tabletaken[id] = id;
        let NPC = document.createElement('a-entity');
        NPC.setAttribute('position', {x:tablepos.x + 1.9, y:1, z: tablepos.z});
        NPC.setAttribute('geometry', 'primitive: cylinder; height:0.1; radius:1');
        NPC.setAttribute('material', 'src: assets/girlselfie.png');
        NPC.setAttribute('rotation', {x:0.00, y:90.0, z:0.00});
        NPC.setAttribute('id', 'npc' + tablename);
        
        table.setAttribute('dsk_ticketgenerating', {});
        table.setAttribute('dynamic-body', 'shape: auto; mass: 100');
        table.setAttribute('constraint', 'target: #scene');
        let scene = document.querySelector('a-scene');
        //Context_AF.Context_AF.el.components['dsk_deletenpcs']
        scene.appendChild(NPC);
            
    },
});