import { SPRest } from "@pnp/sp";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { ISPDataProvider } from "./ISPDataProvider";
import { SPListProvider } from "./SPListProvider";

export class SPDataProvider implements ISPDataProvider{
    public context: WebPartContext;
    public spList: SPListProvider;

    public serverRelativeUrl: string;
    public siteAbsoluteUrl: string;

    constructor(
        protected readonly sp: SPRest,
        protected readonly webPartContext: WebPartContext
    ){
        this.serverRelativeUrl = webPartContext.pageContext.web.serverRelativeUrl;
        this.siteAbsoluteUrl = webPartContext.pageContext.web.absoluteUrl;
        this.spList = new SPListProvider(sp, webPartContext);
        this.context = webPartContext;
    }
}