import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '@interfaces/Product';
import { Review } from '@interfaces/Review';
import { ApiService } from '@services/api/api.service';
import { StoreService } from '@services/store/store.service';
import { Observable, Subject, Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent {
  comments: Review[] = [];
  stars = [1, 2, 3, 4, 5];
  form: FormGroup;
  isAuthenticated$: Observable<boolean>;
  showForm = false;
  id: number;
  private apiSubject$ = new Subject();
  subscription: Subscription;
  product: Product;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private storeService: StoreService
  ) {
    this.id = this.route.snapshot.params.id;
    if (!this.router.getCurrentNavigation()?.extras.state) {
      this.router.navigate(['/']);
    }
    this.product = this.router.getCurrentNavigation()?.extras?.state
      ?.product as Product;
    this.subscription = this.apiSubject$
      .pipe(
        switchMap(() =>
          this.apiService.getProductComments(this.id).pipe(
            map((value) => {
              return value.sort((a, b) => {
                const firstDate = new Date(a.created_at).getTime();
                const secondDate = new Date(b.created_at).getTime();
                if (firstDate > secondDate) {
                  return -1;
                }
                if (firstDate < secondDate) {
                  return 1;
                }
                return 0;
              });
            })
          )
        )
      )
      .subscribe((value) => {
        this.comments = value;
      });
    this.apiSubject$.next();
    this.form = this.fb.group({
      review: ['', [Validators.required]],
      stars: [],
    });
    this.isAuthenticated$ = this.storeService.getAuthenticationStatus();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  get _review(): FormControl {
    return this.form.controls.review as FormControl;
  }

  get _stars(): FormControl {
    return this.form.controls.stars as FormControl;
  }

  onSubmit(): void {
    this.showForm = !this.showForm;
    this.apiService
      .postComment(this.id, this._stars.value, this._review.value)
      .subscribe(() => this.apiSubject$.next());
  }
}
