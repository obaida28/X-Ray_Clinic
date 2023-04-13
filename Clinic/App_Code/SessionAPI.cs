using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Script.Services;
using System.Web.Services;

/// <summary>
/// API for a Session
/// </summary>
public class SessionAPI : procSessions
{
    public SessionAPI()
    {
        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }
    [WebMethod]
    public void open(string parent, int id)
    {
        Dictionary<string, object> send = StringToDic(parent);
        int sessionId = insert(send);
        procAppoiments appoi = new procAppoiments();
        if (id != 0 && !appoi.Finished(id))
            throw new Exception("No data affected!");
        JSON("sessionId", sessionId);
    }
    [WebMethod]
    public void edit(string parent)
    {
        Dictionary<string, object> send = StringToDic(parent);
        if (!IsUpdated(send))
            throw new Exception("No data affected!");
        String("Successful");
    }
    [WebMethod]
    public void addReport(int id, string report)
    {
        if (!AddReport(id, report))
            throw new Exception("No data affected!");
        String("Successful");
    }
    [WebMethod]
    public void end(string parent)
    {
        Dictionary<string, object> send = StringToDic(parent);
        send = AddToDic(send, new string[] { "state" }, new string[] { "end" });
        if (!IsUpdated(send))
            throw new Exception("No row affected!!");
        //int id = Convert.ToInt32(send["id"].ToString());
        //if (!updateState(id, "end"))
        //    throw new Exception("No row affected!");
        String("Successful");
    }
    [WebMethod]
    [ScriptMethod(UseHttpGet = true)]
    public void selectById(int id)
    {
        DataSet ds = SelectSession(id);
        Row(ds);
    }
    [WebMethod]
    [ScriptMethod(UseHttpGet = true)]
    public void selectByPatient(int patient_id)
    {
        DataSet ds = SelectPatientSession(patient_id);
        Table(ds);
    }
    [WebMethod]
    [ScriptMethod(UseHttpGet = true)]
    public void selectAll()
    {
        DataSet ds = SelectAll();
        Table(ds);
    }
    [WebMethod]
    [ScriptMethod(UseHttpGet = true)]
    public void selectByState(string state)
    {
        DataSet ds = SelectByState(state);
        Table(ds);
    }
}