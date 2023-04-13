﻿using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Script.Services;
using System.Web.Services;

/// <summary>
/// API for a Patient
/// </summary>
public class PatientAPI : procPatients
{
    public PatientAPI()
    {
        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }
    [WebMethod]
    public void signUp()
    {
        string msg = "Successful";
        Dictionary<string, object> send = get_send();
        if (!CheckPhone(send))
            msg = "This phone number belongs to another account";
        else
        {
            if (Image.HasImage())
            {
                int newId = SelectNewId();
                string img = saveImage(newId, folder);
                InsertWithImage(send, newId, img);
            }
            else
                Insert(send);
        }
        String(msg);
    }
    [WebMethod]
    public void editProfile()
    {
        string msg = "Successful";
        Dictionary<string, object> send = get_send();
        if (!CheckPhone(send))
            msg = "This phone number belongs to another account";
        else if (!IsUpdated(send))
            msg = "No row affected!";
        String(msg);
    }
    [WebMethod]
    public void login(string phone, string password)
    {
        DataSet ds = Login(phone, password);
        Row(ds, true);
    }
    [WebMethod]
    [ScriptMethod(UseHttpGet = true)]
    public void selectById(int id)
    {
        DataSet ds = SelectPatient(id);
        //DataTable dt = appendColumnValue(ds, "image", string.Format(Image.get_root(), folder), true);
        Row(ds);
    }
    [WebMethod]
    [ScriptMethod(UseHttpGet = true)]
    public void selectByPhone(string phone)
    {
        DataSet ds = SelectByPhone(phone);
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
    public void close(int id)
    {
        if (!Locked(id))
            throw new Exception("No data affected!");
        String("Successful");
    }
}