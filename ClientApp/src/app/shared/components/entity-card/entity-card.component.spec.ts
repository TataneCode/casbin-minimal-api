import '@test-setup';
import { describe, it, expect, beforeEach } from 'vitest';
import type { ComponentFixture } from '@angular/core/testing';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EntityCardComponent } from './entity-card.component';

@Component({
    template: `<app-entity-card title="Card" subtitle="Sub" [imageUrl]="img" [hasFooter]="true"><span card-footer class="foot-marker">Footer</span></app-entity-card>`,
    standalone: true,
    imports: [EntityCardComponent],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
class HostCardTestComponent {}

describe('EntityCardComponent', () => {
    let fixture: ComponentFixture<EntityCardComponent>;
    let component: EntityCardComponent;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [EntityCardComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(EntityCardComponent);
        component = fixture.componentInstance;
        component.title = 'Title';
        component.subtitle = 'Subtitle';
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should render title and subtitle', () => {
        const el: HTMLElement = fixture.nativeElement;
        expect(el.querySelector('.title')?.textContent).toContain('Title');
        expect(el.querySelector('.subtitle')?.textContent).toContain('Subtitle');
    });

    it('should show icon fallback when no imageUrl', () => {
        const el: HTMLElement = fixture.nativeElement;
        expect(el.querySelector('i.fa-user')).toBeTruthy();
    });

    it('should render image when imageUrl provided', async () => {
    @Component({
        template: `<app-entity-card title="WithImg" subtitle="S" [imageUrl]="img"></app-entity-card>`,
        standalone: true,
        imports: [EntityCardComponent],
        changeDetection: ChangeDetectionStrategy.OnPush,
    })
        class HostWithImageComponent { img: string | null = 'https://example.com/avatar.png'; }

    const hostFixture = TestBed.createComponent(HostWithImageComponent);
    hostFixture.detectChanges();
    await hostFixture.whenStable();
    hostFixture.detectChanges();
    const el: HTMLElement = hostFixture.nativeElement;
    expect(el.querySelector('img')).toBeTruthy();
    });

    it('should project footer content when hasFooter true', async () => {
        const hostFixture = TestBed.createComponent(HostCardTestComponent);
        hostFixture.detectChanges();
        const el: HTMLElement = hostFixture.nativeElement;
        expect(el.querySelector('.foot-marker')?.textContent).toContain('Footer');
    });
});
