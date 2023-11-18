import React, { Component } from "react";
import './Main.css';

// Ícones do formulário (adicionar)
import {FaPlus} from 'react-icons/fa'

// Ícones da lista de tarefas (editar e apagar)
import {FaEdit,FaWindowClose} from 'react-icons/fa'


export default class Main extends Component{

    state = {
                novaTarefa: '', // Tarefa criada para adicionar no array
                tarefas:[], // Array de tarefas
               
            };  

// Salvar no LocalStorage

    componentDidMount(){
        let tarefas = JSON.parse(localStorage.getItem('tarefas'));
        if(!tarefas) return;
        this.setState({tarefas});
    }
    componentDidUpdate(prevProps, prevState){
        let {tarefas} = this.state;
        if (tarefas === prevState.tarefas) return;
        localStorage.setItem('tarefas', JSON.stringify(tarefas))
    }

    handleSubmit = (e) =>{
        e.preventDefault()
        const {tarefas, index} = this.state; // Variável de estado
        let {novaTarefa} = this.state; // Valor do formulário
        novaTarefa = novaTarefa.trim();// Atribui o que vem do input sem espaços

        if(novaTarefa === '') return // Se o campo de nova tarefa estiver vazio, acontece nada

        if(tarefas.indexOf(novaTarefa) !== -1) return; // Verifica se essa tarefa já existe na lista

        const novasTarefas = [...tarefas] // Variável que recebe o array de tarefas (...copia), pois não pode mudar o estado diretamente

        if(index === -1){ // Se é uma nova tarefa (CRIAR)
            this.setState({
                tarefas: [...novasTarefas,novaTarefa], // O estado recebe nova tarefa
                novaTarefa: '', // Limpa o input
            })
        }else{ // Se é uma tarefa já existente (EDITAR)
            novasTarefas[index] = novaTarefa // Muda o valor da tarefa nesse índice

            this.setState({
                tarefas: [...novasTarefas], // O estado recebe a cópia das tarefas atualizadas
                index: -1,// Diz que já editou e atualiza o índice para -1
            })

        }
        
    }  

    handleChange = (e) =>{
        this.setState({
            novaTarefa: e.target.value,
        });
    }

    handleEdit = (e, index) =>{
        // console.log('Edit', index)
        const {tarefas} = this.state; // Pega todas as tarefas
        this.setState({
            index, // Passa o índice que é diferente de -1 (!== -1)
            novaTarefa: tarefas[index], // Procura no array tarefas a tarefa que tem esse índice e coloca no input a tarefa que foi selecionada
        });
    }

    handleDelete = (e, index) =>{
        // console.log('Delete', index)
        const {tarefas} = this.state; // Seta o estado de tarefas
        const novasTarefas = [...tarefas]; // Copia as tarefas no array novasTarefas
        novasTarefas.splice(index, 1); // Atualiza 1 item com esse índice

        this.setState({
            tarefas: [...novasTarefas] // Devolve a cópia para o estado
        });
    }

    render(){ // Renderizar
        const {novaTarefa, tarefas} = this.state; // Seta o estado de tarefas e da nova tarefa
        return ( // div do formulário
            <div className="main"> 
                <h1>Lista de Tarefas</h1>
                <form onSubmit={this.handleSubmit} action="#" className="form">
                    <input 
                    onChange={this.handleChange} 
                    type="text"
                    value={novaTarefa}>                      
                    </input>
                    <button type="submit"><FaPlus/></button>
                </form>
               <ul className="listaTarefas">
                    {tarefas.map((tarefa,index)=>{
                         return <li key={tarefa}>
                            {tarefa}    
				<div>
                                <FaEdit
				onClick={(e) => this.handleEdit(e,index)}                             
                                className="edit" /> 
                                <FaWindowClose
                onClick={(e) => this.handleDelete(e,index)}                                               
                                className="close" />
                            </div>                       
                         </li>                   
                    })}  
                                     
                </ul>
            </div>
        )                     
    }
}