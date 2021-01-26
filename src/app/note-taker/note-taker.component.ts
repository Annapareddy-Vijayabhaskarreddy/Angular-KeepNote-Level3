import { Component, OnInit } from '@angular/core';
import { Note } from '../note';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-note-taker',
  templateUrl: './note-taker.component.html',
  styleUrls: ['./note-taker.component.css']
})
export class NoteTakerComponent implements OnInit{

  constructor(private service:NotesService){}
public notes:Array<Note>;
errMessage: string;
note: Note=new Note();
panelOpenState = false;
ngOnInit() {
  this.service.getNotes().subscribe(
    notes => this.notes = notes,
    err => this.errMessage = err.message
  );
}

  addNoteDetails(){
    if(!this.note.title||!this.note.text){
      this.errMessage='Title and Text both are required fields'
    }
    this.service.addNote(this.note).subscribe(data=>{
      if(data){
        this.notes.push(this.note);
    
      }
      else{
        this.errMessage='Unable to add the note to Notes';
      }
     
    },error=>{
      this.errMessage=error.message
    })
    }
}
