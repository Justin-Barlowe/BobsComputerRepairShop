import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { InvoiceService } from '../invoice.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  dataReceived = false;
  data: any[];

  constructor(private invoiceService: InvoiceService) {
    this.data = [];
  }

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
      error => {
        console.error('Error fetching data:', error);
      }
    );
  }

  private createPieChart(): void {
    // Extracting data from the response
    const labels = this.data.map((item: any) => item._id);
    const counts = this.data.map((item: any) => item.count);

    const myPieChart = new Chart('myPieChart', {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          data: counts,
          backgroundColor: [
            '#ED0A3F',
            '#FF8833',
            '#5FA777',
            '#0066CC',
            '#6B3FA0',
            '#AF593E',
            '#6CDAE7'
          ],
          hoverBackgroundColor: [
            '#ED0A3F',
            '#FF8833',
            '#5FA777',
            '#0066CC',
            '#6B3FA0',
            '#AF593E',
            '#6CDAE7'
          ]
        }]
      },
      options: {
        responsive: true
      }
    });
  }
}