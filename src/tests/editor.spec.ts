import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { EditorComponent } from 'app/editor/editor.component';
import { ArticlesService } from 'app/core';
import { SharedModule } from 'app/shared';
import { of, throwError } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { CatFactMock } from 'tests/mocks/cat-fact.mock';

describe('EditorComponent', () => {
  let component: EditorComponent;
  let fixture: ComponentFixture<EditorComponent>;
  let articlesService: ArticlesService;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [EditorComponent],
      imports: [SharedModule, RouterTestingModule],
      providers: [ArticlesService]
    }).compileComponents();

    articlesService = TestBed.inject(ArticlesService);
    fixture = TestBed.createComponent(EditorComponent);
    component = fixture.componentInstance;
  });

  it('should show errors on cat API failure', () => {
    spyOn(articlesService, 'getRandomCatFact').and.returnValue(throwError({
      message: 'Random fact fetch failed'
    }));
    component.getInspired();

    expect(Object.keys(component.errors.errors).length).toBeGreaterThan(0);
  });

  it('should fill the form on API success', () => {
    spyOn(articlesService, 'getRandomCatFact').and.returnValue(of(CatFactMock));
    component.getInspired();

    expect(component.articleForm.getRawValue().body).toEqual(CatFactMock.text);
  });
});
