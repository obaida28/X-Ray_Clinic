using System;
using System.Collections.Generic;
using System.Data;

public class procSessions : Initialization
{
    public procSessions()
    {
        procName = "procSessions";
        attNames = new string[] { "id", "patient_id", "worker_id", "state", "notes" , "report" , "Period" };
        //folder = "Patient";
    }
    public int insert(Dictionary<string, object> send)
    {
        DataSet ds = Insert(send);
        string res = ds.Tables[0].Rows[0][0].ToString();
        if (!CheckInteger(res))
            throw new Exception(res);
        return Convert.ToInt32(res);
    }
    public DataSet SelectSession(int id)
    {
        return Select("SelectSession", id);
    }
    public DataSet SelectAll()
    {
        return Select("SelectAll");
    }
    public DataSet SelectByState(string state)
    {
        setValues("state", state);
        return Select("SelectByState");
    }
    public DataSet SelectPatientSession(int PatientId)
    {
        setValues("patient_id", PatientId);
        return Select("SelectPatientSession");
    }
    public bool AddReport(int id, string report)
    {
        setValues("report", report);
        return IsUpdated("AddReport", id);
    }
}