import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { firstValueFrom } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Router } from '@angular/router';
import { AuthService as Auth0Service } from '@auth0/auth0-angular';

@Component({
    selector: 'app-report',
    templateUrl: './report.component.html',
    styleUrls: ['./report.component.css'],
})
export class ReportComponent implements OnInit {
    displayedColumns: string[] = ['user_id', 'product_name', 'quantity', 'total_sale', 'sales_date'];
    dataSource: MatTableDataSource<any>;
    @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
    pieChartData: ChartData<'pie', number[], string | string[]> = {
        labels: [['Download', 'Sales'], ['In', 'Store', 'Sales'], 'Mail Sales'],
        datasets: [
            {
                data: [12, 12],
            },
        ],
    };
    public pieChartOptions: ChartConfiguration['options'] | any = {
        plugins: {
            legend: {
                display: true,
                position: 'top',
            },
            datalabels: {
                formatter: (value: any, ctx: any) => {
                    if (ctx.chart.data.labels) {
                        return ctx.chart.data.labels[ctx.dataIndex];
                    }
                    return '';
                },
            },
        },
    };
    public pieChartType: ChartType = 'pie';

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    constructor(private api: ApiService, private router: Router, private auth0Service: Auth0Service) {
        this.dataSource = new MatTableDataSource();
    }

    ngOnInit(): void {
        this.loadPayments();
    }

    async loadPayments() {
        try {
            const payments: any = await firstValueFrom(this.api.getReport());
            this.dataSource = new MatTableDataSource(payments);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.prepareChartData(payments);
        } catch (error) {
            console.error('Error loading payments:', error);
        }
    }

    prepareChartData(payments: any[]): void {
        const productNames = [...new Set(payments.map((payment) => payment.product_name))];
        const paymentData = productNames.map((product) => payments.filter((p) => p.product_name === product).reduce((acc, p) => acc + p.total_sale, 0));
        this.pieChartData.labels = productNames;
        this.pieChartData.datasets = [
            {
                data: paymentData,
            },
        ];
        this.chart?.update();
    }

    applyFilter(event: Event): void {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }
    logOut() {
        this.auth0Service.logout({ logoutParams: { returnTo: window.location.origin } });
    }
    goToHome() {
        this.router.navigate(['/pokemons']);
    }
}
