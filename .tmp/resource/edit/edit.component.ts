import { Component, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormioResourceService } from '../resource.service';
import { FormioResourceConfig } from '../resource.config';

@Component({
  template: "<formio [form]=\"service.form\" [submission]=\"service.resource\" [error]=\"triggerError\" [refresh]=\"service.refresh\" (submit)=\"onSubmit($event)\" ></formio> "
})
export class FormioResourceEditComponent {
  public triggerError: EventEmitter<any> = new EventEmitter();
  constructor(
    public service: FormioResourceService,
    public route: ActivatedRoute,
    public router: Router,
    public config: FormioResourceConfig
  ) {}

  onSubmit(submission: any) {
    const edit = this.service.resource;
    edit.data = submission.data;
    this.service.save(edit)
      .then(() => {
        this.router.navigate(['../', 'view'], { relativeTo: this.route });
      })
      .catch((err) => this.triggerError.emit(err));
  }
}
