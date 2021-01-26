import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { EditNoteViewComponent } from '../edit-note-view/edit-note-view.component';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-edit-note-opener',
  templateUrl: './edit-note-opener.component.html',
  styleUrls: ['./edit-note-opener.component.css']
})
export class EditNoteOpenerComponent {
  constructor(
    private activatedRoute: ActivatedRoute,
    private notesService: NotesService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    const noteId = this.activatedRoute.snapshot.paramMap.get('noteId');

    this.dialog.open(EditNoteViewComponent, {
      data: { id: noteId },
    });
  }
}

