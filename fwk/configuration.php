<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of configuration
 *
 * @author octrya
 */
class configuration {
/* Site configuration */
    public static $siteURL	= 'http://www.instruction.fournotfive.be/';

    /* Database configuration */
    public static $dbServer    = 'localhost';
    public static $dbPort 	= '3306';
    public static $dbName 	= 'w1738349_fnf';
    public static $dbUser 	= 'w1738349_fnf_Admin';
    public static $dbPass 	= 'iris82';

    /* Pagination settings */
    public static $pageCount	= 20;

    /**
     * Controls the destination of the logging. Set to syslog or file.
     * When set to file, define public static $logfile.
     * @var string Either 'syslog' or 'file'
     */
    public static $logDestination = 'syslog';
    /**
     * When $logDestination is set to 'file', this variable controls which file
     * logging goes to.
     * @var string A filepath
     */
    public static $logfile = './logfile.log';

    /*
     * Image upload settings
     */
    public static $fileImgSupport      = array("image/gif", "image/jpeg", "image/jpg", "image/pjpeg", "image/x-png", "image/png", "application/vnd.ms-excel","text/plain", "text/csv", "text/tsv", "application/octet-stream", "");
    public static $fileFriendlySupport = 'GIF, JPEG, PNG, CSV';
    public static $fileMaxSize         = 4096;
    public static $fileDestination     = 'upload';
}
