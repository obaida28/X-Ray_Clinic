using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Script.Services;
using System.Web.Services;

/// <summary>
/// API for an Appoiment
/// </summary>
public class AppoimentAPI : procAppoiments
{
    public AppoimentAPI()
    {
        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }
    [WebMethod]
    public void book(string parent)
    {
        Dictionary<string, object> send = StringToDic(parent);
        DateTime date = Convert.ToDateTime(send["appDate"]);
        if (time().Date > date)
            Throw("Old date!");
        DataSet ds = Insert(send);
        string msg = "Successful";
        if (ds.Tables.Count > 0)
            msg = ds.Tables[0].Rows[0][0].ToString();
        String(msg);
    }
    [WebMethod]
    public void edit(string parent)
    {
        Dictionary<string, object> send = StringToDic(parent);
        DateTime date = Convert.ToDateTime(send["appDate"]);
        if (time().Date > date)
            Throw("Old date !");
        if (!update(send))
           Throw("No data affected!");
        String("Successful");
    }
    [WebMethod]
    public void cancel(int id)
    {
        if (!Canceled(id))
            Throw("No data affected!");
        String("Successful");
    }
    [WebMethod]
    [ScriptMethod(UseHttpGet = true)]
    public void select_active(int id)
    {
        DataSet ds = ActiveAppoimentByPatient(id);
        Table(ds);
    }
    [WebMethod]
    [ScriptMethod(UseHttpGet = true)]
    public void select_appoiment(int id)
    {
        DataSet ds = SelectAppoiment(id);
        Row(ds);
    }
    [WebMethod]
    [ScriptMethod(UseHttpGet = true)]
    public void select_appoiment_byHour(int hour)
    {
        DataSet ds = SelectAppoimentByHour(hour);
        Table(ds);
    }
    [WebMethod]
    [ScriptMethod(UseHttpGet = true)]
    public void selectAll()
    {
        DataSet ds = SelectActive();
        Table(ds);
    }
}