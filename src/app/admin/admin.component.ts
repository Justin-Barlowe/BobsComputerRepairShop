// Name: Nolan Berryhill
// Date: 03/01/2023
// File: admin.component.ts
// Description: This file contains data for service purchases graph.

// Import Statements
import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js'; // Import registerables
import { InvoiceService } from '../invoice.service';

// Register necessary chart types
Chart.register(...registerables);

// Selector, templateUrl, StyleUrls for Component
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

// export AdminComponent
export class AdminComponent implements OnInit {

  // give value
  dataReceived = false;
  data: any[];

  // constructor with data
  constructor(private invoiceService: InvoiceService) {
    this.data = [];
  }

  // ngOnInit function
  ngOnInit(): void {
    // Fetch data from the service when the component initializes
    this.invoiceService.findPurchasesByService().subscribe(
      response => {
        console.log('Response received from service:', response); // Log response to inspect its structure
        const data = response.data; // Access the 'data' array from the response object
        if (Array.isArray(data)) {
          console.log('Data received from service:', data); // Log data to inspect its structure
          this.data = data; // Assign the received data to the component property
          this.createPieChart(); // Create the pie chart once the data is retrieved
        } else {
          console.error('Data is not in the expected format:', response);
        }
      },
      // console error
      error => {
        console.error('Error fetching data:', error);
      }
    );
  }

  // createPieChart function
  private createPieChart(): void {

    // Give error if Array is not getting correct data
    if (!Array.isArray(this.data)) {
      console.error('Data is not in the expected format:', this.data);
      return;
    }

    // Extracting data from the response
    const labels = this.data.map((item: any) => item._id);
    const counts = this.data.map((item: any) => item.count);

    // try and catch function for data importing
    try {
      const myPieChart = new Chart('myPieChart', {
        type: 'pie', // Use 'pie' for pie chart
        // data for pie chart
        data: {
          labels: labels,
          datasets: [{
            data: counts,
            // House colors
            backgroundColor: [
              '#740001',
              '#AE0001',
              '#EEBA30',
              '#D3A625',
              '#000000',
              '#740002',
              '#AE0002'
            ],
            hoverBackgroundColor: [
              '#740001',
              '#AE0001',
              '#EEBA30',
              '#D3A625',
              '#000000',
              '#740002',
              '#AE0002'
            ]
          }]
        },
        options: {
          responsive: true
        }
      });
    } catch (error) {
      console.error('Error creating pie chart:', error);
    }
  }
}