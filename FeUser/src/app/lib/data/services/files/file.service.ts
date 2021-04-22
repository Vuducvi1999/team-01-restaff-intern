import { Injectable } from "@angular/core";
import { AppConfig } from "src/app/lib/environments/config/appConfig";
import { HttpClientService } from "src/app/lib/http/http-client";

@Injectable()
export class FileService  {

    private url = '/api/user/file';
    private urlDownload = this.url + '/download';
    private urlGetType = this.url +'/type';

    constructor(private httpClient: HttpClientService) { }

    public static getLinkFile(fileName: String)
    {
      return `${AppConfig.settings.API_URL}/Files/${fileName}`;
    }
  }
