
%define _name      tsProject
%define version    1.0.0
%define _rpmdir    /var/tmp
%define basedir    /opt/miep
%define moduledir  %{basedir}/lib/node_modules
%define projectdir %(echo $PWD)


Name:          %{_name}
Version:       %{version}
Release:       __timestamp__
License:       Commercial
Group:         Applications/Administration
Autoreqprov:   no
BuildRoot:     %{_tmppath}/%{name}-%{version}-build
BuildArch:     x86_64
Summary:       ts project.
Requires:      nodejs >= 6

%Description
ts project
Built from commit << __commit__ >>

%prep
rm -rf ${RPM_BUILD_ROOT}


%install
mkdir -p ${RPM_BUILD_ROOT}/var/log/miep
mkdir -p ${RPM_BUILD_ROOT}%{basedir}/tools/%{_name}
mkdir -p ${RPM_BUILD_ROOT}%{basedir}/etc/tsProject
mkdir -p ${RPM_BUILD_ROOT}%{moduledir}

mv -v %{projectdir}/package/ ${RPM_BUILD_ROOT}%{moduledir}/%{_name}
cp -pv %{contentdir}/startstop.sh ${RPM_BUILD_ROOT}%{basedir}/tools/%{_name}/
%clean

%files

%dir %attr(0770,miepadm,miepgrp) %{basedir}/tools/%{_name}
%dir %attr(0770,miepadm,miepgrp) %{basedir}/etc/tsProject
%dir %attr(0770,miepadm,miepgrp) %{moduledir}/%{_name}
%dir %attr(0770,miepadm,miepgrp) /var/log/miep

%attr(0555,miepadm,miepgrp) %{moduledir}/%{_name}/*
%attr(0555,miepadm,miepgrp) %{basedir}/bin/ns/*
%attr(0555,miepadm,miepgrp) %{basedir}/tools/%{_name}/*

