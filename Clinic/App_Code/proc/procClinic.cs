using System;
using System.Collections.Generic;
using System.Data;

public class procClinic : Initialization
{
    public procClinic()
    {
        procName = "procClinic";
        attNames = new string[] { "doctor_name", "clinic_name", "decsraption", "clinic_open", "clinic_close", "patient_count_hour", "date", "email", "phone" };
    }
    public DataSet SelectClinic()
    {
        return Select("SelectAll");
    }
    public DataSet SelectActiveHour(object date)
    {
        setValues("date", date);
        return Select("SelectActiveHour");
    }
}