import { Component, OnInit } from '@angular/core';
import { Chart, registerables  } from 'chart.js';
Chart.register(...registerables);
import { InvoiceService } from '../invoice.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  constructor(private invoiceService: InvoiceService) {}

  ngOnInit(): void {
    // Fetch data from the service when the component initializes
    this.invoiceService.findPurchasesByService().subscribe(
      data => {
        // Create the pie chart once the data is retrieved
        this.createPieChart(data);
      },
      error => {
        console.error('Error fetching data:', error);
      }
    );
  }

  // Function to create the pie chart
  private createPieChart(data: any): void {
    const myPie = new Chart("myPieChart", {
      type: 'pie',
      data: {
        labels: ['Password Reset', 'Spyware Removal', 'RAM Upgrade', 'Software Installation', 'PC Tune-up', 'Keyboard Cleaning', 'Disk Clean-up'],
        datasets: [{
          data: [data.passwordReset, data.spywareRemoval, data.ramUpgrade, data.softwareInstallation, data.pcTuneUp, data.keyboardCleaning, data.diskCleanup],
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
          ],
        }]
      }
    });
  }
}
