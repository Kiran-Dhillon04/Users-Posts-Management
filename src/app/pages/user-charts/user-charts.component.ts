import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-user-charts',
  templateUrl: './user-charts.component.html',
  styleUrls: ['./user-charts.component.css']
})
export class UserChartsComponent implements OnInit {
  bloodGroupChartData: any;
  ageGroupChartData: any;

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.usersService.users$.subscribe(users => {
      this.prepareBloodGroupChart(users);
      this.prepareAgeGroupChart(users);
    });
  }

  prepareBloodGroupChart(users: any[]) {
    const groups = users.reduce((acc: any, u: any) => {
      acc[u.bloodGroup] = (acc[u.bloodGroup] || 0) + 1;
      return acc;
    }, {});

    this.bloodGroupChartData = {
      labels: Object.keys(groups),
      datasets: [
        { data: Object.values(groups), label: 'Blood Groups', backgroundColor: 'rgba(54, 162, 235, 0.5)' }
      ]
    };
  }

  prepareAgeGroupChart(users: any[]) {
    const ageBuckets = { '<20': 0, '20-29': 0, '30-39': 0, '40-49': 0, '50+': 0 };

    users.forEach(u => {
      const age = this.getAge(u.birthDate);
      if (age < 20) ageBuckets['<20']++;
      else if (age < 30) ageBuckets['20-29']++;
      else if (age < 40) ageBuckets['30-39']++;
      else if (age < 50) ageBuckets['40-49']++;
      else ageBuckets['50+']++;
    });

    this.ageGroupChartData = {
      labels: Object.keys(ageBuckets),
      datasets: [
        { data: Object.values(ageBuckets), label: 'Age Groups', fill: false, borderColor: 'rgb(75, 192, 192)' }
      ]
    };
  }

  getAge(birthDate: string): number {
    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    if (today.getMonth() < birth.getMonth() || (today.getMonth() === birth.getMonth() && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  }
}
