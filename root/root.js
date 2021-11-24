class Menu{
    constructor(){

        this.options = 2; 
        this.container = this.assemble_menu();
        console.log(this.container)
        this.classlist = "Menu";

    }
    assemble_menu(){        

        const divMenu = document.createElement('div');
        divMenu.id = 'divMenu';
        //paths
        const home = document.createElement('a');
        const eventos = document.createElement('a');
        home.id = 'home';
        home.innerHTML = 'Home';
        eventos.id = 'eventos';
        eventos.innerHTML = 'Eventos';
        
        [divMenu,home,eventos].forEach(function(element){ element.className = 'Menu'})

        document.body.appendChild(divMenu);
        divMenu.appendChild(home);
        divMenu.appendChild(eventos);

        return {menu:divMenu,options:{home,eventos}}

    }
}
const x = new Menu;