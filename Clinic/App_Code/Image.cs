using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;
using System.Configuration;
using System.Data;
using System.Web.Script.Serialization;
using System.Web.Script.Services;
using System.Web.Services;

/// <summary>
/// Image : root and image_name and extention and full_name and full_path
/// </summary>
public class Image : System.Web.Services.WebService
{
    private static string root = "~/Images/{0}/";
    protected string full_image_name;
    protected string image_name;
    protected string extention;
    public Image(string image_name, string extention , string folderURL)
    {
        this.extention = extention;
        this.image_name = image_name;
        full_image_name = image_name + extention;
        root = string.Format(root, folderURL);
    }
    public Image(string full_image_name, string folderURL)
    {
        extention = full_image_name.Substring(full_image_name.IndexOf('.'));
        image_name = full_image_name.Substring(0, full_image_name.IndexOf('.'));
        this.full_image_name = full_image_name;
        root = string.Format(root, folderURL);
    }
    public string get_full_path() { return root + full_image_name; }
    public string get_full_image_name() { return full_image_name; }
    public void set_full_image_name() { full_image_name = image_name + extention; }
    public string get_image_name() { return image_name; }
    public string get_extention() { return extention; }
    public static string get_root() { return root; }
    public static bool HasImage()
    {
        HttpPostedFile file = null;
        if (HttpContext.Current.Request.Files.Count > 0)
        {
            file = HttpContext.Current.Request.Files["image"];
            return file.ContentLength > 0;
        }
        return false;
    }
    public static bool HasImages()
    {
        if (HttpContext.Current.Request.Files.Count > 0)
        {
            var t = HttpContext.Current.Request.Files.AllKeys.Where(e => e.Contains("image"));
            return t.ToArray().Length > 0;
        }
        return false;
    }
    public static void save(WebService api , HttpPostedFile file , int id , string root)
    {
        if (file.ContentLength > 0)
        {
            string SavePath = api.Server.MapPath(root);
            if (!Directory.Exists(SavePath))
                Directory.CreateDirectory(SavePath);
            string ex = Path.GetExtension(file.FileName);
            string img = id + ex ;
            string fullPath = SavePath + img;
            file.SaveAs(SavePath + "\\" + img);
        }
    }
    public static void save(Image img , string SavePath , HttpPostedFile file)
    {
        if (file.ContentLength > 0)
        {
            if (!Directory.Exists(SavePath))
                Directory.CreateDirectory(SavePath);
            string fullPath = SavePath + img.full_image_name;
            file.SaveAs(SavePath + "\\" + fullPath);
        }
    }
    public string get_extention(HttpPostedFile file)
    {
        return Path.GetExtension(file.FileName);
    }
    public string save()
    {
        HttpPostedFile file = null;
        if (HttpContext.Current.Request.Files.Count > 0)
            file = HttpContext.Current.Request.Files["image"];
        if (file.ContentLength > 0)
        {
            extention = Path.GetExtension(file.FileName);
            set_full_image_name();
            string SavePath = Server.MapPath(root);
            if (!Directory.Exists(SavePath))
                Directory.CreateDirectory(SavePath);
            file.SaveAs(SavePath + "\\" + full_image_name);
            return full_image_name;
        }
        return null;
    }
}