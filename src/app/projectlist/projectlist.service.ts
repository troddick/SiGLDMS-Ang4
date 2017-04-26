// ------------------------------------------------------------------------------
// ----- projectlist.service ----------------------------------------------------
// ------------------------------------------------------------------------------

// copyright:   2016 WiM - USGS
//
// authors:  Tonia Roddick USGS Wisconsin Internet Mapping             
//
// purpose: service to retrieve the projectlist

import { Injectable } from '@angular/core';

import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { CONFIG } from "app/shared/CONFIG";
import { IindexProject } from "app/shared/interfaces/projects/indexProject.interface";

@Injectable()
export class ProjectlistService {
    constructor(private _http: Http){}

    // gets resolved when coming to this route
    public getProjects(){
     //   return PROJECTS;
         let options = new RequestOptions({headers: CONFIG.JSON_AUTH_HEADERS});
         return this._http.get(CONFIG.PROJECT_URL + "/IndexProjects", options)
            .map(p => <Array<IindexProject>>p.json())
    }
}
