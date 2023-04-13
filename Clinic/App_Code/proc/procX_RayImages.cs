using System;
using System.Collections.Generic;
using System.Data;

public class procX_RayImages : Initialization
{
    public procX_RayImages()
    {
        procName = "procX_RayImages";
        attNames = new string[] { "id", "patient_id", "worker_id", "session_id", "title", "image_state", "explain_state", "notes", "image" };
        folder = "X_RAY";
    }
    public int SelectNewId()
    {
        DataSet ds = SelectNewId("SelectNewId");
        return Convert.ToInt32(ds.Tables[0].Rows[0][0].ToString());
    }
    public DataSet SelectByPatient(int patient_id)
    {
        setValues("patient_id", patient_id);
        return Select("SelectByPatient");
    }
    public DataSet SelectBySession(int session_id)
    {
        setValues("session_id", session_id);
        return Select("SelectBySession");
    }
}