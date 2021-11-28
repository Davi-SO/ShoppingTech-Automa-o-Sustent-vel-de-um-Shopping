class Menu{
    constructor(){

        this.options = 2; 
        this.container = this.assemble_menu();
        console.log(this.container)
        this.classlist = "Menu";
        this.open_eventos();

    }
    assemble_menu(){        

        const divMenu = document.createElement('div');
        divMenu.id = 'divMenu';
        //paths
        const login = document.createElement('a');
        const home = document.createElement('a');
        const eventos = document.createElement('a');
        const simulação = document.createElement('a');
        login.id = 'login';
        login.innerText = 'Login'
        home.id = 'home';
        home.innerText = 'Home';
        eventos.id = 'eventos';
        eventos.innerText = 'Eventos';
        simulação.id = 'simulação';
        simulação.innerText = 'Simulação';
        simulação.href = '../entrada/entrada.html';
        
        [divMenu,login,home,eventos,simulação].forEach(function(element){ element.className = 'Menu'})

        document.body.appendChild(divMenu);
        divMenu.appendChild(login);
        divMenu.appendChild(home);
        divMenu.appendChild(eventos);
        divMenu.appendChild(simulação);

        return {menu:divMenu,options:{login,home,eventos,simulação}}

    }
    open_eventos(){
        const eventosDiv = document.createElement('div');
        eventosDiv.id = 'eventosDiv';
        document.body.appendChild(eventosDiv);

        const calendar = document.createElement('div');
        calendar.classList = 'calendar';
        eventosDiv.appendChild(calendar);
        
    }
}
const x = new Menu;