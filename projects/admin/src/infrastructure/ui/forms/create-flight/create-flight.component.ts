import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { BaseFormComponent } from 'shared';
import { IFlightRequest } from '../../../../domain/model/flight.model';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'lib-create-flight',
  imports: [BaseFormComponent, ReactiveFormsModule],
  templateUrl: './create-flight.component.html',
  styleUrl: './create-flight.component.scss',
})
export class CreateFlightComponent {
  
  @Output() createFlight = new EventEmitter<IFlightRequest>();
  flightRequest: any = {
    flightNumber: 'ABC123',
    flightModel: 'Boeing 747',
    routeId: 'R123',
    price: 500,
  };
  customLabels: Record<string, string> = {
    flightNumber: 'Número de Vuelo',
    flightModel: 'Modelo de Avión',
    routeId: 'Ruta',
    price: 'Precio',
  };
  private formBuilder = inject(FormBuilder);
  public formGroup = this.formBuilder.group({
    flightNumber: ['', Validators.required],
    flightModel: ['', Validators.required],
    routeId: ['', Validators.required],
    price: ['', Validators.required],
    departureTime: ['', Validators.required],
    arrivalTime: ['', Validators.required],
  });

  submit() {
    if (this.formGroup.valid) {
      this.createFlight.emit(this.formGroup.value as unknown as IFlightRequest);
      console.log('se paso todo bien');
      this.formGroup.reset();
    } else {
      console.log(this.formGroup.value);
    }
  }

  
}

