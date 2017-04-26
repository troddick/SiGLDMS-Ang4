// ------------------------------------------------------------------------------
// ----- projectdata.component -----------------------------------------------
// ------------------------------------------------------------------------------

// copyright:   2016 WiM - USGS
//
// authors:  Tonia Roddick USGS Wisconsin Internet Mapping             
//
// purpose: information on this project's data hosts (add, edit, delete)

import { Component, OnInit } from '@angular/core';
import { ProjectdetailService } from "app/projectdetail/projectdetail.service";
import { IDatahost } from "app/shared/interfaces/projects/datahost.interface";
import { ActivatedRoute } from "@angular/router";
import { IFullproject } from "app/shared/interfaces/projects/fullProject.interface";

// import { NewDataComponent } from './newdatahost.component';

@Component({
  templateUrl: "projectdata.component.html",
  styleUrls: ['./projectdata.component.css'], 
})
export class ProjectdataComponent implements OnInit {
  public componentName: string;
  public projectId: number;
  public projectData: Array<IDatahost>;
  public neededUpdating: boolean; // if the url isn't formatted, flag so know to PUT it after fixing
  public isEditing: boolean;
  private tempData: IDatahost;
  // public newData: IDatahost;

  constructor(private _projectDetService: ProjectdetailService, private _route: ActivatedRoute) { }

  ngOnInit() { 
    this.componentName = "ProjData";
    this.neededUpdating = false;
  //  this.newData = { description: null, host_name: null, portal_url: null};
    this._route.parent.data.subscribe((data: { fullProject: IFullproject }) => {
      this.projectData = data.fullProject.DataHosts;    
      this.projectId = data.fullProject.ProjectId;
      // if any ProjDatum, make sure the url (if one) is formatted properly
      for (var pdu = 0; pdu < this.projectData.length; pdu++) {
          var ind = pdu;
          this.projectData[ind].isEditing = false;
          if (this.projectData[ind].portal_url !== undefined && !this.projectData[ind].portal_url.startsWith('http')) {
              //there is a url and it's not formatted
              this.neededUpdating = true;
              this.projectData[ind].portal_url = 'http://' + this.projectData[ind].portal_url;
            /*  $http.defaults.headers.common.Authorization = 'Basic ' + $cookies.get('siGLCreds');
              $http.defaults.headers.common.Accept = 'application/json';
              DATA_HOST.update({ id: $scope.ProjData[ind].data_host_id }, $scope.ProjData[ind]).$promise; */
          }
      }
    });
    this._projectDetService.projData().subscribe((d: Array<IDatahost>) => {
      this.projectData = d;
    });
  } // end ngOnInit()

  // want to edit
  public EditRowClicked(i:number) {
    this.tempData = Object.assign({}, this.projectData[i]); // make a copy in case they cancel
    this.projectData[i].isEditing = true;
    this.isEditing = true; // set to true so create new is disabled
  }

  // nevermind editing
  public CancelEditRowClicked(i:number) {
    this.projectData[i] = Object.assign({}, this.tempData);
    this.projectData[i].isEditing = false;
    this.isEditing = false; // set to true so create new is disabled
  }

  // create new data host
  public AddDataHost(d: IDatahost){
    d.project_id = this.projectId;
    this._projectDetService.postDatahost(d);
  }
  // did they make a change and not save?
  public canDeactivate(): Promise<boolean> | boolean {    
    // Allow synchronous navigation (`true`) if no datahost or the datahost is unchanged
    // if (!this.projectData || this.crisis.name === this.editName) {
      return true;
    // }
      // Otherwise ask the user with the dialog service and return its
      // promise which resolves to true or false when the user decides
    // return this.dialogService.confirm('Discard changes?');
  }
}

