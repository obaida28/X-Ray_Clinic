using System;
using System.Collections.Generic;
using System.Data;
/// <summary>
///procAppoiments is a row corresponding to the procAppoiments procedure in the database
/// </summary>
public class procAppoiments : Initialization
{
    public procAppoiments()
    {
        procName = "procAppoiments";
        attNames = new string[] { "id", "patient_id", "appDate", "hour", "state", "notes", "doctor_name", "doctor_number", "gender", "phone" };
    }
    public DataSet ActiveAppoimentByPatient(int id)
    {
        setValues("patient_id", id);
        return Select("SelectActiveByPatient");
    }
    public bool update(Dictionary<string, object> send)
    {
        string value = Update(Update(send));
        return value != "0";
    }
    public bool Canceled(int id)
    {
        setValues("state", "Canceled");
        DataSet ds = Update("UpdateState", id);
        string colName = ds.Tables[0].Columns[0].ColumnName;
        string value = ds.Tables[0].Rows[0][colName].ToString();
        if (colName == "msg")
            Throw(value);
        return value != "0";
    }
    public bool Finished(int id)
    {
        DataSet ds = Update("FinishApp", id);
        return rowAffected(ds) > 0;
    }
    public DataSet SelectActive()
    {
        return Select("SelectActiveAppoiments");
    }
    public DataSet SelectAppoiment(int id)
    {
        return Select("SelectAppoiment", id);
    }
    public DataSet SelectAppoimentByHour(int hour)
    {
        setValues("hour", hour);
        return Select("SelectAppoimentByHour");
    }
}