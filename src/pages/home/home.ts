import { Component } from '@angular/core';
import { NavController, AlertController, reorderArray, ToastController } from 'ionic-angular';
import {TodoProvider} from "../../providers/todo/todo";
import {ArchivedTodosPage } from "../archived-todos/archived-todos";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public todos = [];
  public reorderIsEnabled = false;

  constructor(private toastController: ToastController, private todoService: TodoProvider, public navCtrl: NavController, private alertController: AlertController) {
    this.todos=this.todoService.getTodos();
  }

  toggleReorder(){
    this.reorderIsEnabled=!this.reorderIsEnabled;
  }

  itemReordered($event){
    //get current and moved state
    reorderArray(this.todos,$event);
  }

  gotToArchivePage(){
    this.navCtrl.push(ArchivedTodosPage);
  }

  archiveTodo(todoIndex){
    this.todoService.archiveTodo(todoIndex);
  }
  
  editTodo(todoIndex){
    let editTodoAlert = this.alertController.create({
      title: 'Edit Todo',
      message: 'Edit your Todo',
      inputs: [
        {
          type: 'text',
          name: 'editTodo',
          value: this.todos[todoIndex]
        }
      ],
      buttons: [
        {
          text: 'cancel',
        },
        {
          text: 'Edit Todo',
          handler: (inputData)=>{
            let todoText;
            todoText=inputData.editTodo;
            this.todoService.editTodo(todoText, todoIndex);

            editTodoAlert.onDidDismiss(()=>{
              let editTodoToast = this.toastController.create({
                message: 'Todo Edited',
                duration: 2000
              });
              editTodoToast.present();
            })
          }
        }
      ],
    });
    editTodoAlert.present();
  }

  openTodoAlert(){
    let addTodoAlert = this.alertController.create({
      title: "Add a Todo",
      message: "Enter your Todo",
      inputs: [
        {
          type: "text",
          name: "addTodoInput"
        }
      ],
      buttons: [
        {
          text: "Cancel",
        },
        {
          text: "Add Todo",
          handler: (inputData)=>{
            let todoText;
            todoText=inputData.addTodoInput;
            this.todoService.addTodo(todoText);

            addTodoAlert.onDidDismiss(()=>{
              let addTodoToast = this.toastController.create({
                message: "Todo Added",
                duration: 2000
              });
              addTodoToast.present();
            });  
          }
        }
      ]
    });
    addTodoAlert.present();
  }

}
