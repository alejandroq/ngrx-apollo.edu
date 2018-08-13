import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AddReview } from '../review/review.actions';
import { Review } from '../review/review.model';

@Component({
  selector: 'app-review-form',
  templateUrl: './review-form.component.html',
  styleUrls: ['./review-form.component.css']
})
export class ReviewFormComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder, private store: Store<any>) { }

  ngOnInit() {
    this.form = this.fb.group({
      stars: [0, Validators.required],
      commentary: ['', Validators.required],
    });
  }

  submit() {
    if (this.form.valid) {
      const {
        stars,
        commentary,
      } = this.form.value;
      this.store.dispatch(new AddReview({ review: <Review>{ id: Date.now().toString(), stars, commentary } }));
      this.form.reset();
    }
  }

}
