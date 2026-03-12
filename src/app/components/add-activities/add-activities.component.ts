import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IActivities } from 'src/app/models/types/interfaces/activities';
import { FirestoreService } from 'src/app/shared/services/firestore.service';

@Component({
  selector: 'app-add-activities',
  templateUrl: './add-activities.component.html',
  styleUrls: ['./add-activities.component.scss'],
})
export class AddActivitiesComponent implements OnInit {
  addActivityForm!: FormGroup;
  formError = '';

  constructor(
    private firestore: FirestoreService,
    private fb: FormBuilder,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.addActivityForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      tag: ['', Validators.required],
      description: ['', Validators.required],
      cost_estimate: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      startLocation: ['', Validators.required],
      endLocation: ['', Validators.required],
    });
  }

  addUserActivity() {
    if (this.addActivityForm.invalid) {
      this.formError = 'Please fill in all required fields.';
      this.addActivityForm.markAllAsTouched();
      return;
    }

    const activityId = this.firestore.generateRandomString();
    const activity: IActivities = {
      id: activityId,
      ...this.addActivityForm.value,
    };

    this.firestore.addActivities(activity).subscribe({
      next: () => {
        this.formError = '';
        this.router.navigate(['/dashboard']);
      },
      error: (err: Error) => {
        this.formError = 'Failed to save activity: ' + (err.message || err);
      },
    });
  }

  clearForm() {
    this.addActivityForm.reset();
  }
}
