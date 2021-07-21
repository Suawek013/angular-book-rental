import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { DomainService } from "src/app/auth/domain.service";

@Component({
  selector: 'configuration-form',
  templateUrl: 'configuration-form.component.html',
  styleUrls: ['configuration-form.component.css']
})

export class ConfigurationFormComponent implements OnInit {
  domain;
  host;
  port;
  secure;

  constructor(public domainService: DomainService) { }

  updateConfig(form: NgForm) {
    this.domainService.updateConfig('0', form.value.domain, form.value.host, form.value.port, form.value.secure);
  }
  ngOnInit() {
    this.domainService.getConfig();
    this.domain = this.domainService.getDomainName();
    this.domainService.getDomainListener().subscribe(data => {
      this.domain = data;
    });

    this.host = this.domainService.getHostName();
    this.domainService.getHostListener().subscribe(data => {
      this.host = data;
    });

    this.port = this.domainService.getPortName();
    this.domainService.getPortListener().subscribe(data => {
      this.port = data;
    });

    this.secure = this.domainService.getSecureName();
    this.domainService.getSecureListener().subscribe(data => {
      this.secure = data;
    });
  }
}
