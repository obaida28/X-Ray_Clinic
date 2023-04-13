using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Script.Services;
using System.Web.Services;

/// <summary>
/// API for Images in Session for a Patiant
/// </summary>
public class X_RayImagesAPI : procX_RayImages
{
    public X_RayImagesAPI()
    {
        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }
    [WebMethod]
    public void upload()
    {
        string msg = "Successful";
        Dictionary<string, object> send = get_send();
        if (!Image.HasImage())
            msg = "you should add image!";
        else
        {
            int newId = SelectNewId();
            string img = saveImage(newId, folder);
            InsertWithImage(send, newId, img);
        }
        String(msg);
    }
    [WebMethod]
    [ScriptMethod(UseHttpGet = true)]
    public void ByPatient(int id)
    {
        DataSet ds = SelectByPatient(id);
        Table(ds);
    }
    [WebMethod]
    [ScriptMethod(UseHttpGet = true)]
    public void BySession(int id)
    {
        DataSet ds = SelectBySession(id);
        Table(ds);
    }
}