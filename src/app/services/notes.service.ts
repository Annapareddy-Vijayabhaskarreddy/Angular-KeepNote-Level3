import { Injectable, OnInit } from '@angular/core';
import { Note } from '../note';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class NotesService {
  constructor(
    private http: HttpClient,
    private authService: AuthenticationService
  ) {
    this.notes = [];
    this.notesSubject = new BehaviorSubject([]);
  }

  notes: Array<Note>;
  notesSubject: BehaviorSubject<Array<Note>>;

  fetchNotesFromServer() {
    return this.http
      .get<Array<Note>>('http://localhost:3000/api/v1/notes', {
        headers: {
          Authorization: `Bearer ${this.authService.getBearerToken()}`,
        },
      })
      .subscribe(
        (data: any) => {
          this.notes = data;
          console.log(this.notes);

          this.notesSubject.next(this.notes);
        },
        (error) => {
          // this.notesSubject.error(error);
        }
      );
  }

  getNotes(): BehaviorSubject<Array<Note>> {
    // console.log(this.notesSubject);

    return this.notesSubject;
  }

  addNote(note: Note): Observable<Note> {
    return this.http
      .post<Note>('http://localhost:3000/api/v1/notes', note, {
        headers: {
          Authorization: `Bearer ${this.authService.getBearerToken()}`,
        },
      })
      // .do((res) => {
      //   this.notes.push(res);
      //   this.notesSubject.next(this.notes);
      // }
      // );
  }

  editNote(note: Note): Observable<Note> {
    return this.http
      .put<Note>(`http://localhost:3000/api/v1/notes/${note.id}`, note, {
        headers: {
          Authorization: `Bearer ${this.authService.getBearerToken()}`,
        },
      })
      // .do((data) => {
      //   // const note = this.notes.find((item) => item.id === data.id);
      //   // Object.assign(note, data);
      //   // this.notesSubject.next(this.notes);
      //   this.notes.push(data);
      //   this.notesSubject.next(this.notes);
      // });
  }

  getNoteById(noteId): Note {
    return this.notes.find((note) => note.id === Number(noteId));
  }
}
