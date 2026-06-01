import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, expect, it, beforeEach, vi } from 'vitest';
import { UploadComponent } from './upload.component';

describe('UploadComponent', () => {
  let component: UploadComponent;
  let fixture: ComponentFixture<UploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(UploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('emits validationError for unsupported file types', () => {
    const emitSpy = vi.spyOn(component.validationError, 'emit');
    const file = { type: 'text/plain', size: 1024 } as File;

    component['handleFile'](file);

    expect(emitSpy).toHaveBeenCalledWith(
      'Unsupported file type. Only PNG, JPEG, and WEBP are allowed.',
    );
  });

  it('exposes the default maxFileSizeMb input signal', () => {
    expect(component.maxFileSizeMb()).toBe(5);
  });
});
