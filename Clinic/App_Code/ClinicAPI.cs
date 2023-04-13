using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Script.Services;
using System.Web.Services;

/// <summary>
/// API for a Clinic
/// </summary>
public class ClinicAPI : procClinic
{
    public ClinicAPI()
    {
        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }
    [WebMethod]
    public void edit(string parent)
    {
        Dictionary<string, object> send = StringToDic(parent);
        if (!IsUpdated(send))
            throw new Exception("No row affected!");
        String("Successful");
    }
    [WebMethod]
    [ScriptMethod(UseHttpGet = true)]
    public void select_clinic()
    {
        DataSet ds = SelectClinic();
        Row(ds);
    }
    [WebMethod]
    [ScriptMethod(UseHttpGet = true)]
    public void select_Active_Hour(string date)
    {
        DataSet ds = SelectActiveHour(date);
        Table(ds);
    }
}