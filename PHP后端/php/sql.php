<?php

namespace SQL;

//数据库
//**** */
function usebase($sql, $base)
{
	$command = "USE `" . $base . "`;";
	return $sql->query($command);
}
function selectsql($sql, $table, $what, $key, $value)
{
	$command = "SELECT " . $what . " FROM " . $table . " WHERE " . $key . "=" . $value . ";";
	return $sql->query($command);
}
function insert($sql, $table, $body)
{
	$command = "INSERT INTO ".$table." ";
	$keys = "(";
	$values = "(";
	foreach ($body as $key => $value) {
		$keys = $keys . $key . ",";
		$values = $values . $value . ",";
	}
	$keys = rtrim($keys, ",");
	$values = rtrim($values, ",");
	$keys = $keys . ")";
	$values = $values . ")";
	$command = $command . $keys . " VALUES " . $values;
	return $sql->query($command);
}
