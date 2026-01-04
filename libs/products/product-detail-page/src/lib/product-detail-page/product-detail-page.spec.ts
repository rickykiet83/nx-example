import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { BehaviorSubject } from 'rxjs';
import { ProductDetailPageComponent } from './product-detail-page';
import { productsFeature } from '@nx-example/shared/product/state';

describe('ProductDetailPage', () => {
  let component: ProductDetailPageComponent;
  let fixture: ComponentFixture<ProductDetailPageComponent>;
  let store: MockStore;

  // paramMap observable mock
  const paramMap$ = new BehaviorSubject(convertToParamMap({ productId: '1' }));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductDetailPageComponent], // ✅ only standalone component here
      providers: [
        // ✅ mock ActivatedRoute
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: paramMap$.asObservable(),
          },
        },

        // ✅ mock store selectors
        provideMockStore({
          selectors: [
            { selector: productsFeature.selectProducts, value: [] },
            { selector: productsFeature.selectStatus, value: 'idle' },
          ],
        }),
      ],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(ProductDetailPageComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(store).toBeTruthy();
  });
});
